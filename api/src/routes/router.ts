import { Router } from "express";
import auth_middleware from "../middlewares/auth_middleware";
import authRouter from "./auth_router";
import clienteRouter from "./cliente_router";
import assinaturaRouter from "./assinatura_router";
import transacaoRouter from "./transacao_router";
import planoRouter from "./plano_router";
import usuariosRouter from "./usuario_router";
import bloqueioRouter from "./bloqueio_router";

const router = Router();

router.use("/auth", authRouter);
router.use("/cliente", auth_middleware, clienteRouter);
router.use("/assinatura", auth_middleware, assinaturaRouter);
router.use("/transacao", auth_middleware, transacaoRouter);
router.use("/plano", auth_middleware, planoRouter);
router.use("/usuario", auth_middleware, usuariosRouter);
router.use("/bloqueio", auth_middleware, bloqueioRouter);

export default router;