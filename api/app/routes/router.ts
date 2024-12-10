import { Router } from "express";
import auth_middleware from "../middlewares/auth_middleware";
import accountMiddleware from "../middlewares/account_middleware";
import { authRouter, clienteRouter, usuariosRouter } from "./administracao";
import { assinaturaRouter, bloqueioRouter, planoRouter } from "./assinaturas";
import { contasSistemaRouter } from "./contas-sistema";
import { categoriaRouter, contasRouter, parcelamentoRouter, transacaoRouter } from "./financeiro";
import { stripeRouter } from "./stripe";
import mercadopagoRouter from "./financeiro/mercadopago/mercadopago_router";
import vendasRouter from "./vendas/vendas_router";
import uploadRouter from "./uploads/uploadRouter";
import relatoriosRouter from "./relatorios/relatorios_router";
import patrimonioRouter from "./patrimonio/patrimonio_router";

const router = Router();
// Rotas de assinatura
router.use("/assinatura", auth_middleware, accountMiddleware, assinaturaRouter);
router.use("/plano", auth_middleware, accountMiddleware, planoRouter);
router.use("/bloqueio", auth_middleware, accountMiddleware, bloqueioRouter);
// Rotas de administração
router.use("/auth", authRouter);
router.use("/usuario", auth_middleware, accountMiddleware, usuariosRouter);
router.use("/cliente", auth_middleware, accountMiddleware, clienteRouter);
// Rotas Financeiro
router.use("/financeiro/transacao", auth_middleware, accountMiddleware, transacaoRouter);
router.use("/financeiro/parcelamento", auth_middleware, accountMiddleware, parcelamentoRouter);
router.use("/financeiro/contas", auth_middleware, accountMiddleware, contasRouter);
router.use("/financeiro/categoria", auth_middleware, accountMiddleware, categoriaRouter);
// Rotas Mercado pago
router.use("/mercadopago", mercadopagoRouter);
// Rotas Stripe
router.use("/stripe", stripeRouter);
// Rotas de contas do sistema
router.use("/contas-sistema", auth_middleware, contasSistemaRouter);
// Rotas de patrimonio
router.use("/patrimonio", auth_middleware, accountMiddleware, patrimonioRouter);
// Rotas de vendas
router.use("/vendas", auth_middleware, accountMiddleware, vendasRouter);
// Rotas de uploads
router.use("/uploads", auth_middleware, accountMiddleware, uploadRouter);
// Rotas de relatorios
router.use("/relatorios", auth_middleware, accountMiddleware, relatoriosRouter);

export default router;
