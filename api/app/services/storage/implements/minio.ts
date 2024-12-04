import {
  ItemBucketMetadata,
  UploadedObjectInfo,
} from "minio/dist/main/internal/type";
import { IStorageProvider } from "../dtos/IStorageProvider";
import path from "path";
import { MinioService } from "../cloud/minio_service";

export class MinioStorageProvider implements IStorageProvider {
  bucketName: string = "";
  constructor(bucketName: string) {
    this.bucketName = bucketName;
  }
  async presignUrl(objectName: string): Promise<string> {
    const presignedUrl = await MinioService.presignedGetObject(
      this.bucketName,
      objectName,
      24 * 60 * 60
    );
    return presignedUrl;
  }
  async upload(file: Express.Multer.File, folder: string): Promise<any> {
    const generateRandomId = () => Math.floor(Math.random() * 1000000000);
    const fileName = `${Date.now()}-${generateRandomId()}${path.extname(file.originalname)}`;
    const filePath = `${folder}/${fileName}`; // Adiciona a "pasta" da conta

    await this.createBucketIfNotExists();

    const metadata: ItemBucketMetadata = {
      "Content-Type": file.mimetype,
      "x-amz-acl": "public-read",
    };

    const result = await MinioService.putObject(
      this.bucketName,
      filePath,
      file.buffer,
      file.size,
      metadata
    );
    return {
      etag: result.etag,
      filename: fileName,
      path: folder,
      version: result.versionId,
    };
  }
  async delete(objectName: string): Promise<void> {
    await MinioService.removeObject(this.bucketName, objectName);
    console.log(`Arquivo ${objectName} excluído com sucesso.`);
  }
  async createBucketIfNotExists(): Promise<void> {
    const exists = await MinioService.bucketExists(this.bucketName);
    if (!exists) {
      await MinioService.makeBucket(this.bucketName);
      console.log(`Bucket ${this.bucketName} criado com sucesso.`);
    }
  }
}
