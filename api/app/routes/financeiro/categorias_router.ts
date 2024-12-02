import { Router } from "express";
import { createcategoria, deletecategoria, getcategoria, getcategorias, updatecategoria } from "../../controllers/financeiro/categorias_controller";
const categoriaRouter = Router();

categoriaRouter.post("/", createcategoria);
categoriaRouter.get("/:id", getcategoria);
categoriaRouter.get("/", getcategorias);
categoriaRouter.put("/:id", updatecategoria);
categoriaRouter.delete("/:id", deletecategoria);

export default categoriaRouter;