import { Request, Response } from "express";
import { MinioStorageProvider } from "../../services/storage/implements/minio";
const storage = new MinioStorageProvider("organizasoft", "conta01");
const uploadFile = async (req: Request, res: Response) => {
    try {
        if (!req.files) return res.status(400).json({ message: 'Arquivo não encontrado.' });
        const files = req.files as Express.Multer.File[];
        const uploads = await Promise.all(files.map(async (file) => await storage.upload(file)));
        res.status(200).json({ message: 'Upload realizado com sucesso.', uploads });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao fazer upload.', error });
    }
};

const deleteFile = async (req: Request, res: Response) => {
    try {
        const forceDelete = req.query.forceDelete === 'true';
        await storage.delete(req.params.objectName, forceDelete);
        res.status(200).json({ message: 'Arquivo excluído com sucesso.' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao excluir arquivo.', error });
    }
};

const presignUrl = async (req: Request, res: Response) => {
    try {
        const presignedUrl = await storage.presignUrl(req.params.objectName);
        res.status(200).json({ message: 'Presigned URL gerada com sucesso.', presignedUrl });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao gerar presigned URL.', error });
    }
};

export { uploadFile, deleteFile, presignUrl };
