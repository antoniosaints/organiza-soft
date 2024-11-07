import { Router } from "express";
import { createTransacao, deleteComprovante, deleteTransacao, efetivarTransacao, getTransacao, getTransacoes, renameComprovante, updateTransacao, uploadComprovante } from "../../controllers/financeiro/transacao_controller";
const transacaoRouter = Router();

transacaoRouter.get("/:id", getTransacao);
transacaoRouter.get("/efetivar/:id", efetivarTransacao);
transacaoRouter.get("/", getTransacoes);
transacaoRouter.post("/", createTransacao);
transacaoRouter.put("/:id", updateTransacao);
transacaoRouter.delete("/:id", deleteTransacao);
transacaoRouter.post("/upload", uploadComprovante);
transacaoRouter.delete("/upload/:filename", deleteComprovante);
transacaoRouter.put("/upload/:filename", renameComprovante);


export default transacaoRouter;