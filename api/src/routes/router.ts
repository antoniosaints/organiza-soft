import { Router } from "express";
import auth_middleware from "../middlewares/auth_middleware";
import authRouter from "./auth_router";
import clienteRouter from "./cliente_router";
import assinaturaRouter from "./assinatura_router";
import transacaoRouter from "./transacao_router";
import planoRouter from "./plano_router";
import usuariosRouter from "./usuario_router";
import bloqueioRouter from "./bloqueio_router";
import categoriaRouter from "./categorias_router";
import parcelamentoRouter from "./parcelamento_router";
import contasRouter from "./contas_router";
import gruposRouter from "./grupos_router";
import permissoesRouter from "./permissoes_router";
import stripeRouter from "./stripe/stripe_router";
import contasSistemaRouter from "./contas-sistema/contas_sistema_router";

const router = Router();

router.use("/auth", authRouter);
router.use("/cliente", auth_middleware, clienteRouter);
router.use("/grupo", auth_middleware, gruposRouter);
router.use("/permissoes", auth_middleware, permissoesRouter);
router.use("/assinatura", auth_middleware, assinaturaRouter);
router.use("/transacao", auth_middleware, transacaoRouter);
router.use("/parcelamento", auth_middleware, parcelamentoRouter);
router.use("/contas", auth_middleware, contasRouter);
router.use("/plano", auth_middleware, planoRouter);
router.use("/usuario", auth_middleware, usuariosRouter);
router.use("/bloqueio", auth_middleware, bloqueioRouter);
router.use("/categoria", auth_middleware, categoriaRouter);

// Rotas Stripe
router.use("/stripe", stripeRouter);
// Rotas de contas do sistema
router.use("/contas-sistema", contasSistemaRouter);

export default router;