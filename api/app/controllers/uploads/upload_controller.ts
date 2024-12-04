import { Request, Response } from "express";
import { MinioStorageProvider } from "../../services/storage/implements/minio";

export class UploadController {
    static async uploadFile(req: Request, res: Response) {
        try {
            if (!req.files) {
                return res.status(400).json({ message: 'Arquivo não encontrado.' });
            }
            const files = req.files as Express.Multer.File[];
            const minio = new MinioStorageProvider("organizasoft", "conta01");
            const uploads = await Promise.all(files.map(async (file) => await minio.upload(file)));
            res.status(200).json({ message: 'Upload realizado com sucesso.', uploads });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao fazer upload.', error });
        }
    }

    static async presignUrl(req: Request, res: Response) {
        try {
            const minio = new MinioStorageProvider("organizasoft", "conta01");
            const presignedUrl = await minio.presignUrl(req.params.objectName);
            res.status(200).json({ message: 'Presigned URL gerada com sucesso.', presignedUrl });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao gerar presigned URL.', error });
        }
    }
}