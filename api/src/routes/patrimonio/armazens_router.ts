import { Router } from "express";
import { createArmazen, deleteArmazen, getArmazen, getArmazens, updateArmazen } from "../../controllers/patrimonio/armazen_controller";
const armazensRouter = Router();

armazensRouter.get("/:id", getArmazen);
armazensRouter.get("/", getArmazens);
armazensRouter.post("/", createArmazen);
armazensRouter.put("/:id", updateArmazen);
armazensRouter.delete("/:id", deleteArmazen);

export default armazensRouter;