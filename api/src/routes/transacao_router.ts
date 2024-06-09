import { Router } from "express";
import { createTransacao, deleteTransacao, getTransacao, getTransacoes, updateTransacao } from "../controllers/transacao_controller";
const transacaoRouter = Router();

transacaoRouter.post("/", createTransacao);
transacaoRouter.get("/:id", getTransacao);
transacaoRouter.get("/", getTransacoes);
transacaoRouter.put("/:id", updateTransacao);
transacaoRouter.delete("/:id", deleteTransacao);

export default transacaoRouter;