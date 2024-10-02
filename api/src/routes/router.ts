import { Router } from "express";
import auth_middleware from "../middlewares/auth_middleware";
import accountMiddleware from "../middlewares/account_middleware";
import { authRouter, clienteRouter, usuariosRouter } from "./administracao";
import { assinaturaRouter, bloqueioRouter, planoRouter } from "./assinaturas";
import { contasSistemaRouter } from "./contas-sistema";
import { categoriaRouter, contasRouter, parcelamentoRouter, transacaoRouter } from "./financeiro";
import { gruposRouter, permissoesRouter } from "./permissoes";
import { stripeRouter } from "./stripe";
import produtosRouter from "./patrimonio/produtos_router";
import produtoCategoriaRouter from "./patrimonio/produto_categoria_router";

const router = Router();

// Rotas de Permissoes
router.use("/grupo", auth_middleware, accountMiddleware, gruposRouter);
router.use("/permissoes", auth_middleware, accountMiddleware, permissoesRouter);
// Rotas de assinatura
router.use("/assinatura", auth_middleware, accountMiddleware, assinaturaRouter);
router.use("/plano", auth_middleware, accountMiddleware, planoRouter);
router.use("/bloqueio", auth_middleware, accountMiddleware, bloqueioRouter);
// Rotas de administração
router.use("/auth", authRouter);
router.use("/usuario", auth_middleware, accountMiddleware, usuariosRouter);
router.use("/cliente", auth_middleware, accountMiddleware, clienteRouter);
// Rotas Financeiro
router.use("/transacao", auth_middleware, accountMiddleware, transacaoRouter);
router.use("/parcelamento", auth_middleware, accountMiddleware, parcelamentoRouter);
router.use("/contas", auth_middleware, accountMiddleware, contasRouter);
router.use("/categoria", auth_middleware, accountMiddleware, categoriaRouter);
// Rotas Stripe
router.use("/stripe", auth_middleware, accountMiddleware, stripeRouter);
// Rotas de contas do sistema
router.use("/contas-sistema", auth_middleware, contasSistemaRouter);
// Rotas de patrimonio
router.use("/patrimonio/produto", auth_middleware, accountMiddleware, produtosRouter);
router.use("/patrimonio/categoria", auth_middleware, accountMiddleware, produtoCategoriaRouter);

export default router;
