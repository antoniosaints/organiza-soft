import { Router } from "express";
import { createPlano, deletePlano, getPlano, getPlanos, updatePlano } from "../../controllers/assinaturas/plano_controller";
const planoRouter = Router();

planoRouter.post("/", createPlano);
planoRouter.get("/:id", getPlano);
planoRouter.get("/", getPlanos);
planoRouter.put("/:id", updatePlano);
planoRouter.delete("/:id", deletePlano);

export default planoRouter;