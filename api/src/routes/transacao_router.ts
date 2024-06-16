import { Router } from "express";
import { createTransacao, deleteComprovante, deleteTransacao, getTransacao, getTransacoes, renameComprovante, updateTransacao, uploadComprovante } from "../controllers/transacao_controller";
const transacaoRouter = Router();

transacaoRouter.get("/:id", getTransacao);
transacaoRouter.get("/", getTransacoes);
transacaoRouter.post("/", createTransacao);
transacaoRouter.put("/:id", updateTransacao);
transacaoRouter.delete("/:id", deleteTransacao);
transacaoRouter.post("/upload", uploadComprovante);
transacaoRouter.delete("/upload/:filename", deleteComprovante);
transacaoRouter.put("/upload/:filename", renameComprovante);


export default transacaoRouter;