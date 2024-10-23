import { Router } from "express";
import { createCheckoutMercadopagoVenda, createPixMercadopagoVenda, createVenda } from "../../controllers/vendas/vendas_controller";
const vendasRouter = Router();

vendasRouter.post("/", createVenda);
vendasRouter.get("/checkout/:id", createCheckoutMercadopagoVenda);
vendasRouter.get("/pix/:id", createPixMercadopagoVenda);

export default vendasRouter;