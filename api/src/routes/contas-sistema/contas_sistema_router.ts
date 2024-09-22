import { Router } from "express";
import auth_middleware from "../../middlewares/auth_middleware";
import { getContaSistema } from "../../controllers/contas-sistema/get_conta_sistema";
import { getContasSistema } from "../../controllers/contas-sistema/get_contas_sistema";
const contasSistemaRouter = Router();

contasSistemaRouter.get("/get-conta-sistema/:id", auth_middleware, getContaSistema);
contasSistemaRouter.get("/get-contas-sistema", auth_middleware, getContasSistema);

export default contasSistemaRouter;