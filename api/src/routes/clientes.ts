import { Router } from "express";
import prisma_service from "../services/prisma_service";

const routerClientes = Router();

routerClientes.get("/", async (req, res) => {
    try {
        const clientes = await prisma_service.clientes.findMany({});
        res.json(clientes);
    }catch (e) {
        console.log(e);
    }
});

export default routerClientes;