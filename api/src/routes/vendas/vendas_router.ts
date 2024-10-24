import { Router } from "express";
import { createCheckoutMercadopagoVenda, createPixMercadopagoVenda, createVenda, deleteVenda, getVenda, getVendas } from "../../controllers/vendas/vendas_controller";
const vendasRouter = Router();

vendasRouter.post("/", createVenda);
vendasRouter.get("/checkout/:id", createCheckoutMercadopagoVenda);
vendasRouter.get("/pix/:id", createPixMercadopagoVenda);
vendasRouter.get("/", getVendas);
vendasRouter.get("/:id", getVenda);
vendasRouter.delete("/:id", deleteVenda);

export default vendasRouter;