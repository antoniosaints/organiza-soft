import { Router } from "express";
import { cancelarParcela, createTransacao, deleteComprovante, deleteTransacao, efetivarParcela, efetivarTransacao, estornarParcela, getResumoLancamentos, getTransacao, getTransacoes, renameComprovante, updateTransacao, uploadComprovante } from "../../controllers/financeiro/transacao_controller";
const transacaoRouter = Router();

transacaoRouter.get("/:id", getTransacao);
transacaoRouter.get("/efetivar/:id", efetivarTransacao);
transacaoRouter.get("/efetivarParcela/:id", efetivarParcela);
transacaoRouter.get("/estornarParcela/:id", estornarParcela);
transacaoRouter.get("/cancelarParcela/:id", cancelarParcela);
transacaoRouter.get("/", getTransacoes);
transacaoRouter.get("/resumo/totais", getResumoLancamentos);
transacaoRouter.post("/", createTransacao);
transacaoRouter.put("/:id", updateTransacao);
transacaoRouter.delete("/:id", deleteTransacao);
transacaoRouter.post("/upload", uploadComprovante);
transacaoRouter.delete("/upload/:filename", deleteComprovante);
transacaoRouter.put("/upload/:filename", renameComprovante);


export default transacaoRouter;