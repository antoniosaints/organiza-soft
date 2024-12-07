import { Router } from "express";
import { createRelatorioFinanceiro } from "../../controllers/relatorios/financeiros/financeiro_relatorio_controller";
const financeiroRelatorioRouter = Router();

financeiroRelatorioRouter.get("/", createRelatorioFinanceiro);

export default financeiroRelatorioRouter;