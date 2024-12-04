import { Request, Response } from "express";
import { MinioStorageProvider } from "../../services/storage/implements/minio";

export class UploadController {
    static async uploadFile(req: Request, res: Response) {
        try {
            if (!req.file) {
                return res.status(400).json({ message: 'Arquivo não encontrado.' });
            }
            const minio = new MinioStorageProvider("organizasoft", "organizasoft");
            const fileName = await minio.upload(req.file);
            res.status(200).json({ message: 'Upload realizado com sucesso.', fileName });
        } catch (error) {
            console.error('Erro ao fazer upload:', error);
            res.status(500).json({ message: 'Erro ao fazer upload.', error });
        }
    }

    static async presignUrl(req: Request, res: Response) {
        try {
            const minio = new MinioStorageProvider("organizasoft", "organizasoft");
            const presignedUrl = await minio.presignUrl(req.params.objectName);
            res.status(200).json({ message: 'Presigned URL gerada com sucesso.', presignedUrl });
        } catch (error) {
            console.error('Erro ao gerar presigned URL:', error);
            res.status(500).json({ message: 'Erro ao gerar presigned URL.', error });
        }
    }
}