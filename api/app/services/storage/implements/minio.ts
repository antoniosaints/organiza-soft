import { UploadedObjectInfo } from "minio/dist/main/internal/type";
import { MinioService } from "../../minio_service";
import { IStorageProvider } from "../IStorageProvider";
import path from "path";

export class MinioStorageProvider implements IStorageProvider {
  bucketName: string = "";
  constructor(bucketName: string) {
    this.bucketName = bucketName;
  }

  async getAll(): Promise<any> {
    const dataStream = await MinioService.getObject(
      this.bucketName,
      "1733256950286-3716548.xlsx"
    );

    // Para ler o conteúdo do stream
    let data = "";
    dataStream.on("data", (chunk) => {
      data += chunk.toString();
    });

    dataStream.on("end", () => {
      console.log("Conteúdo do objeto:", data);
    });
    
    dataStream.on("error", (err) => {
        console.error("Erro ao ler o objeto:", err);
    });
    return data;
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
      file.size
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
