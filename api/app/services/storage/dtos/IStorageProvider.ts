import { UploadedObjectInfo } from "minio/dist/main/internal/type";

export interface IStorageProvider {
    upload(file: Express.Multer.File, folder: string): Promise<any>;
    delete(path: string): Promise<void>;
    presignUrl(objectName: string, expiresIn: number): Promise<string>;
}