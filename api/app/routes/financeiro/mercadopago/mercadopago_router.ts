import { Router } from "express";
import { MPCreatePreferenceLink } from "../../../controllers/financeiro/mercadopago/create_preference_controller";
import { MPCreatePaymentLink } from "../../../controllers/financeiro/mercadopago/create_payment_controller";
import { MPWebhookPagamentos } from "../../../controllers/financeiro/mercadopago/webhook_mercadopago";
import auth_middleware from "../../../middlewares/auth_middleware";
import accountMiddleware from "../../../middlewares/account_middleware";
const mercadopagoRouter = Router();

mercadopagoRouter.post("/criar-preference", auth_middleware, accountMiddleware, MPCreatePreferenceLink);
mercadopagoRouter.post("/criar-payment", auth_middleware, accountMiddleware, MPCreatePaymentLink);
mercadopagoRouter.post("/webhook", MPWebhookPagamentos);

export default mercadopagoRouter;