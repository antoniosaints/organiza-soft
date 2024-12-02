import { Router } from "express";
import { getCodigoBarra } from "../../controllers/patrimonio/codigo_barra_controller";
const codigoBarraRouter = Router();

codigoBarraRouter.get("/:texto", getCodigoBarra);

export default codigoBarraRouter;