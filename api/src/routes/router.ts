import { Router } from "express";
import auth_middleware from "../middlewares/auth_middleware";
import accountMiddleware from "../middlewares/account_middleware";
import { authRouter, clienteRouter, usuariosRouter } from "./administracao";
import { assinaturaRouter, bloqueioRouter, planoRouter } from "./assinaturas";
import { contasSistemaRouter } from "./contas-sistema";
import { categoriaRouter, contasRouter, parcelamentoRouter, transacaoRouter } from "./financeiro";
import { stripeRouter } from "./stripe";
import produtosRouter from "./patrimonio/produtos_router";
import produtoCategoriaRouter from "./patrimonio/produto_categoria_router";
import fornecedoresRouter from "./patrimonio/fornecedores_router";
import armazensRouter from "./patrimonio/armazens_router";
import mercadopagoRouter from "./financeiro/mercadopago/mercadopago_router";
import vendasRouter from "./vendas/vendas_router";

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
router.use("/financeiro/categoria", auth_middleware, accountMiddleware, categoriaRouter);
// Rotas Mercado pago
router.use("/mercadopago", mercadopagoRouter);
// Rotas Stripe
router.use("/stripe", stripeRouter);
// Rotas de contas do sistema
router.use("/contas-sistema", auth_middleware, contasSistemaRouter);
// Rotas de patrimonio
router.use("/patrimonio/produto", auth_middleware, accountMiddleware, produtosRouter);
router.use("/patrimonio/categoria", auth_middleware, accountMiddleware, produtoCategoriaRouter);
router.use("/patrimonio/fornecedor", auth_middleware, accountMiddleware, fornecedoresRouter);
router.use("/patrimonio/armazen", auth_middleware, accountMiddleware, armazensRouter);
// Rotas de vendas
router.use("/vendas", auth_middleware, accountMiddleware, vendasRouter);

export default router;
