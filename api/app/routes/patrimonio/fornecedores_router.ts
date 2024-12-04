import { Router } from "express";
import { createFornecedor, deleteFornecedor, getFornecedor, getFornecedores, updateFornecedor } from "../../controllers/patrimonio/fornecedores_controller";
const fornecedoresRouter = Router();

fornecedoresRouter.get("/:id", getFornecedor);
fornecedoresRouter.get("/", getFornecedores);
fornecedoresRouter.post("/", createFornecedor);
fornecedoresRouter.put("/:id", updateFornecedor);
fornecedoresRouter.delete("/:id", deleteFornecedor);

export default fornecedoresRouter;