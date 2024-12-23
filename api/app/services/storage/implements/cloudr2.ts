import { IStorageProvider } from "../dtos/IStorageProvider";
import { R2Service } from "../cloud/r2_service";
import path from "path";
import {
  DeleteObjectCommand,
  DeleteObjectCommandInput,
  GetObjectAclCommandInput,
  GetObjectCommand,
  PutObjectCommand,
  PutObjectCommandInput,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export class R2StorageProvider implements IStorageProvider {
  bucketName: string = "";
  pathName: string = "";
  constructor(bucketName: string, pathName: string) {
    this.bucketName = bucketName;
    this.pathName = pathName;
  }
  async upload(file: Express.Multer.File, folder: string): Promise<any> {
    const generateRandomId = () => Math.floor(Math.random() * 1000000000);
    const fileName = `${Date.now()}-${generateRandomId()}${path.extname(file.originalname)}`;
    const filePath = `${folder}/${fileName}`; // Adiciona a "pasta" da conta

    const params: PutObjectCommandInput = {
      Bucket: this.bucketName,
      Key: filePath,
      ACL: "public-read",
      Body: file.buffer,
      ContentType: file.mimetype,
    };

    const result = await R2Service.send(new PutObjectCommand(params));
    return {
      etag: result.ETag,
      filename: fileName,
      path: folder,
      version: result.VersionId,
    };
  }
  async delete(path: string): Promise<any> {
    const params: DeleteObjectCommandInput = {
      Bucket: this.bucketName,
      Key: path,
    };

    const result = await R2Service.send(new DeleteObjectCommand(params));
    return result;
  }

  async presignUrl(
    objectName: string,
    expiresIn: number = 86400
  ): Promise<string> {
    const params: GetObjectAclCommandInput = {
      Bucket: `${this.pathName}/${objectName}`,
      Key: objectName,
    };
    const command = new GetObjectCommand(params);
    const url = await getSignedUrl(R2Service, command, { expiresIn });
    return url;
  }
}
