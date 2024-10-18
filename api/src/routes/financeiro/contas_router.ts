import { Router } from "express";
import { createConta, deleteConta, getConta, getContas, updateConta } from "../../controllers/financeiro/contas_controller";
const contasRouter = Router();

contasRouter.get("/:id", getConta);
contasRouter.get("/", getContas);
contasRouter.post("/", createConta);
contasRouter.put("/:id", updateConta);
contasRouter.delete("/:id", deleteConta);


export default contasRouter;