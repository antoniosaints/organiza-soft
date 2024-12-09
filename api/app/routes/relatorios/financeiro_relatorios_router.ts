import { Router } from "express";
import { createRelatorioFinanceiro, downloadRelatorioFinanceiro } from "../../controllers/relatorios/financeiros/financeiro_relatorio_controller";
const financeiroRelatorioRouter = Router();

financeiroRelatorioRouter.get("/", createRelatorioFinanceiro);
financeiroRelatorioRouter.get("/download", downloadRelatorioFinanceiro);

export default financeiroRelatorioRouter;