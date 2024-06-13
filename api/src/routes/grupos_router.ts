import { Router } from "express";
import { createGrupos, deletegrupos, getGrupo, getGrupos, updateGrupo } from "../controllers/grupos_controller";
const gruposRouter = Router();

gruposRouter.post("/", createGrupos);
gruposRouter.get("/:id", getGrupo);
gruposRouter.get("/", getGrupos);
gruposRouter.put("/:id", updateGrupo);
gruposRouter.delete("/:id", deletegrupos);

export default gruposRouter;