import { UploadedObjectInfo } from "minio/dist/main/internal/type";

export interface IStorageProvider {
    upload(file: Express.Multer.File, folder: string): Promise<UploadedObjectInfo>;
    delete(path: string): Promise<void>;
    getAll(): Promise<any>;
}