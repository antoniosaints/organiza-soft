import { Router } from "express";
import { createProduto, deleteProduto, getProduto, getProdutos, updateProduto } from "../../controllers/patrimonio/produto_controller";
const produtosRouter = Router();

produtosRouter.get("/:id", getProduto);
produtosRouter.get("/", getProdutos);
produtosRouter.post("/", createProduto);
produtosRouter.put("/:id", updateProduto);
produtosRouter.delete("/:id", deleteProduto);

export default produtosRouter;