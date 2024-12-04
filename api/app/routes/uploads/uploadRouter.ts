import { Router } from "express";
import multer from "multer";
import { UploadController } from "../../controllers/uploads/upload_controller";
const uploadRouter = Router();
const upload = multer();

uploadRouter.post("/", upload.array("file"), UploadController.uploadFile);
uploadRouter.get("/:objectName", UploadController.presignUrl);

export default uploadRouter;