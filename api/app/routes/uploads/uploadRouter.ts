import { Router } from "express";
import multer from "multer";
import { deleteFile, presignUrl, uploadFile } from "../../controllers/uploads/upload_controller";
const uploadRouter = Router();
const upload = multer();

uploadRouter.post("/", upload.array("file"), uploadFile);
uploadRouter.get("/:objectName", presignUrl);
uploadRouter.delete("/:objectName", deleteFile);

export default uploadRouter;