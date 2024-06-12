import { Router } from "express";
import { createTransacao, deleteTransacao, getTransacao, getTransacoes, updateTransacao } from "../controllers/transacao_controller";
const transacaoRouter = Router();

transacaoRouter.get("/:id", getTransacao);
transacaoRouter.get("/", getTransacoes);
transacaoRouter.post("/", createTransacao);
transacaoRouter.put("/:id", updateTransacao);
transacaoRouter.delete("/:id", deleteTransacao);


export default transacaoRouter;