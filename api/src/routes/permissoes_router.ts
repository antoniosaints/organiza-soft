import { Router } from "express";
import { createPermissoes, deletepermissoes, getPermissao, getPermissoes, updatePermissao } from "../controllers/permissoes_controller";
const permissoesRouter = Router();

permissoesRouter.post("/", createPermissoes);
permissoesRouter.get("/:id", getPermissao);
permissoesRouter.get("/", getPermissoes);
permissoesRouter.put("/:id", updatePermissao);
permissoesRouter.delete("/:id", deletepermissoes);

export default permissoesRouter;