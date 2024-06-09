import { Router } from "express";
import { createCliente, deleteCliente, getCliente, getClientes, updateCliente } from "../controllers/cliente_controller";
const clienteRouter = Router();

clienteRouter.post("/", createCliente);
clienteRouter.get("/:id", getCliente);
clienteRouter.get("/", getClientes);
clienteRouter.put("/:id", updateCliente);
clienteRouter.delete("/:id", deleteCliente);

export default clienteRouter;