import { Router } from "express";
import { createCategoria, deleteCategoria, getCategoria, getCategorias, updateCategoria } from "../../controllers/patrimonio/produto_categoria_controller";
const produtoCategoriaRouter = Router();

produtoCategoriaRouter.get("/:id", getCategoria);
produtoCategoriaRouter.get("/", getCategorias);
produtoCategoriaRouter.post("/", createCategoria);
produtoCategoriaRouter.put("/:id", updateCategoria);
produtoCategoriaRouter.delete("/:id", deleteCategoria);

export default produtoCategoriaRouter;