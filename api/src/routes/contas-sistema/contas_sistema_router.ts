import { Router } from "express";
import { getContaSistema } from "../../controllers/contas-sistema/get_conta_sistema";
import { getContasSistema } from "../../controllers/contas-sistema/get_contas_sistema";
const contasSistemaRouter = Router();

contasSistemaRouter.get("/get-conta-sistema/:id", getContaSistema);
contasSistemaRouter.get("/get-contas-sistema", getContasSistema);

export default contasSistemaRouter;