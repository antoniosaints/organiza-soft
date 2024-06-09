import { Router } from "express";
import { createAssinatura, deleteAssinatura, getAssinatura, getAssinaturas, updateAssinatura } from "../controllers/assinatura_controller";
const assinaturaRouter = Router();

assinaturaRouter.post("/", createAssinatura);
assinaturaRouter.get("/:id", getAssinatura);
assinaturaRouter.get("/", getAssinaturas);
assinaturaRouter.put("/:id", updateAssinatura);
assinaturaRouter.delete("/:id", deleteAssinatura);

export default assinaturaRouter;