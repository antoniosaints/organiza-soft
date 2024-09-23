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
import accountMiddleware from "../middlewares/account_middleware";

const router = Router();

router.use("/auth", authRouter);
router.use("/cliente", auth_middleware, accountMiddleware, clienteRouter);
router.use("/grupo", auth_middleware, accountMiddleware, gruposRouter);
router.use("/permissoes", auth_middleware, accountMiddleware, permissoesRouter);
router.use("/assinatura", auth_middleware, accountMiddleware, assinaturaRouter);
router.use("/transacao", auth_middleware, accountMiddleware, transacaoRouter);
router.use("/parcelamento", auth_middleware, accountMiddleware, parcelamentoRouter);
router.use("/contas", auth_middleware, accountMiddleware, contasRouter);
router.use("/plano", auth_middleware, accountMiddleware, planoRouter);
router.use("/usuario", auth_middleware, accountMiddleware, usuariosRouter);
router.use("/bloqueio", auth_middleware, accountMiddleware, bloqueioRouter);
router.use("/categoria", auth_middleware, accountMiddleware, categoriaRouter);
// Rotas Stripe
router.use("/stripe", auth_middleware, accountMiddleware, stripeRouter);
// Rotas de contas do sistema
router.use("/contas-sistema", auth_middleware, contasSistemaRouter);

export default router;
