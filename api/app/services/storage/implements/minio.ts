import { UploadedObjectInfo } from "minio/dist/main/internal/type";
import { MinioService } from "../../minio_service";
import { IStorageProvider } from "../IStorageProvider";
import path from "path";

export class MinioStorageProvider implements IStorageProvider {
  bucketName: string = "";
  constructor(bucketName: string) {
    this.bucketName = bucketName;
  }

  async download(objectName: string): Promise<any> {
    const data = MinioService.fGetObject(
      this.bucketName,
      objectName,
      `.\\uploads\\${objectName}`
    );

    return data;
  }
  async presignUrl(objectName: string): Promise<string> {
    const presignedUrl = await MinioService.presignedGetObject(
      this.bucketName,
      objectName,
      24 * 60 * 60
    );
    return presignedUrl;
  }
  async upload(
    file: Express.Multer.File,
    folder: string
  ): Promise<UploadedObjectInfo> {
    const generateRandomId = () => Math.floor(Math.random() * 1000000000);
    const fileName = `${Date.now()}-${generateRandomId()}${path.extname(file.originalname)}`;

    await this.createBucketIfNotExists();

    const result = await MinioService.putObject(
      this.bucketName,
      fileName,
      file.buffer,
      file.size,
      { "Content-Type": file.mimetype }
    );
    console.log(`Arquivo ${fileName} enviado ao MinIO com sucesso.`);

    return result;
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
