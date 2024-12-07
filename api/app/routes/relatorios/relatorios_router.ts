import { Router } from "express";
import financeiroRelatorioRouter from "./financeiro_relatorios_router";
const relatoriosRouter = Router();

relatoriosRouter.use("/financeiros", financeiroRelatorioRouter);

export default relatoriosRouter;