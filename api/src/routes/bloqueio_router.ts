import { Router } from "express";
import { createBloqueio, deleteBloqueio, getBloqueio, getBloqueios, updateBloqueio } from "../controllers/bloqueio_controller";
const bloqueioRouter = Router();

bloqueioRouter.post("/", createBloqueio);
bloqueioRouter.get("/:id", getBloqueio);
bloqueioRouter.get("/", getBloqueios);
bloqueioRouter.put("/:id", updateBloqueio);
bloqueioRouter.delete("/:id", deleteBloqueio);

export default bloqueioRouter;