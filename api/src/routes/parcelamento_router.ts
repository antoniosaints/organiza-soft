import { Router } from "express";
import { createParcelamento, deleteParcelamento, getParcelamento, getParcelamentos, updateParcelamento } from "../controllers/parcelamento_controller";
const parcelamentoRouter = Router();

parcelamentoRouter.get("/:id", getParcelamento);
parcelamentoRouter.get("/", getParcelamentos);
parcelamentoRouter.post("/", createParcelamento);
parcelamentoRouter.put("/:id", updateParcelamento);
parcelamentoRouter.delete("/:id", deleteParcelamento);


export default parcelamentoRouter;