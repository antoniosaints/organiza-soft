import { Router } from "express";
import routerClientes from "./clientes";
import auth_middleware from "../middlewares/auth_middleware";
import authRouter from "./auth";

const router = Router();

router.use("/clientes", auth_middleware, routerClientes);
router.use("/auth", authRouter);

export default router;