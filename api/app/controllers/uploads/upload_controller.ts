import { Request, Response } from "express";
import { MinioStorageProvider } from "../../services/storage/implements/minio";

export class UploadController {
    static async uploadFile(req: Request, res: Response) {
        try {
            if (!req.file) {
                return res.status(400).json({ message: 'Arquivo não encontrado.' });
            }
            const minio = new MinioStorageProvider("organizasoft");
            const fileName = await minio.upload(req.file, "organizasoft");
            res.status(200).json({ message: 'Upload realizado com sucesso.', fileName });
        } catch (error) {
            console.error('Erro ao fazer upload:', error);
            res.status(500).json({ message: 'Erro ao fazer upload.', error });
        }
    }

    static async getFiles(req: Request, res: Response) {
        try {
            const minio = new MinioStorageProvider("organizasoft");
            const files = await minio.getAll();
            res.status(200).json({ message: 'Objetos recuperados.', objects: files });
        } catch (error) {
            console.error('Erro ao buscar os objetos:', error);
            res.status(500).json({ message: 'Erro ao buscar os objetos.', error });
        }
    }
}