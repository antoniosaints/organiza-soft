import { Router } from "express";
import multer from "multer";
import { UploadController } from "../../controllers/uploads/upload_controller";
const uploadRouter = Router();
const upload = multer();

uploadRouter.post("/", upload.single("file"), UploadController.uploadFile);
uploadRouter.get("/", UploadController.getFiles);

export default uploadRouter;