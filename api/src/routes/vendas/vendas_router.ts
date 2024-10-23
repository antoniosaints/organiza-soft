import { Router } from "express";
import { createCheckoutMercadopagoVenda, createVenda } from "../../controllers/vendas/vendas_controller";
const vendasRouter = Router();

vendasRouter.post("/", createVenda);
vendasRouter.post("/checkout/:id", createCheckoutMercadopagoVenda);

export default vendasRouter;