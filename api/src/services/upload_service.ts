import { promises as fs } from "fs";
import multer from "multer";
import path from "path";

const ensureDirectoryExists = async (directory: any) => {
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
  const storage = multer.diskStorage({
    destination: async (req, file, cb) => {
      try {
        await ensureDirectoryExists(pathName);
        cb(null, pathName);
      } catch (error) {
        cb(new Error("Falha na criação do diretorio"), "");
      }
    },
    filename: (req, file, cb) => {
      const extension = path.extname(file.originalname);
      cb(null, `${Date.now()}_${tagUpload}${extension}`);
    },
  });

  const fileFilter = (req: Request, file: any, cb: any) => {
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
      // 'audio/mpeg',
      // 'audio/wav',
      // 'video/mp4',
      // 'application/zip',
      // 'application/x-rar-compressed',
      // 'application/gzip',
      // 'application/x-7z-compressed',
      // 'application/octet-stream',
      // 'application/x-msdownload'
    ];

    if (allowTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type!"), false);
    }
  };

  const limitFileSize = { fileSize: 1024 * 1024 * 5 };

  const upload = multer({ storage, limits: limitFileSize, fileFilter });
  return upload.array(fileName, 10);
};

export default uploadService;
