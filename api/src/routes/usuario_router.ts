import { Router } from "express";
import { createUsuario, deleteUsuario, getUsuario, getUsuarios, updateUsuario } from "../controllers/usuario_controller";
const usuariosRouter = Router();

usuariosRouter.post("/", createUsuario);
usuariosRouter.get("/:id", getUsuario);
usuariosRouter.get("/", getUsuarios);
usuariosRouter.put("/:id", updateUsuario);
usuariosRouter.delete("/:id", deleteUsuario);

export default usuariosRouter;