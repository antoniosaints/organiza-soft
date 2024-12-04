import { Request } from "express";
import { promises as fs } from "fs";
import multer, { StorageEngine } from "multer";
import path from "path";

const ensureDirectoryExists = async (directory: string): Promise<void> => {
  try {
    await fs.access(directory);
  } catch (error) {
    console.log(`Diretório inexistente, criado automaticamente: ${directory}`);
    await fs.mkdir(directory, { recursive: true });
  }
};

const uploadService = (
  fileName: string,
  tagUpload: string,
  pathName = "uploads/"
) => {
  const storage: StorageEngine = multer.diskStorage({
    destination: async (
      req: Request,
      file: Express.Multer.File,
      cb: (error: Error | null, destination: string) => void
    ) => {
      try {
        await ensureDirectoryExists(pathName);
        cb(null, pathName);
      } catch (error) {
        cb(new Error("Falha na criação do diretorio"), "");
      }
    },
    filename: (
      req: Request,
      file: Express.Multer.File,
      cb: (error: Error | null, filename: string) => void
    ) => {
      const extension = path.extname(file.originalname);
      cb(null, `${Date.now()}_${tagUpload}${extension}`);
    },
  });

  const fileFilter = (req: Request, file: Express.Multer.File, cb: any) => {
    const allowTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/gif",
      "image/bmp",
      "image/webp",
      "image/tiff",
      "image/svg+xml",
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "application/vnd.ms-powerpoint",
      "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    ];

    if (allowTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Tipo de arquivo inválido!"), false);
    }
  };

  const limitFileSize = { fileSize: 1024 * 1024 * 5 };

  const upload = multer({ storage, limits: limitFileSize, fileFilter });
  return upload.array(fileName, 10);
};

export default uploadService;
