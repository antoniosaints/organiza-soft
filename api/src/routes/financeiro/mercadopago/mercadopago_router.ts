import { Router } from "express";
import { MPCreatePaymentLink } from "../../../controllers/financeiro/mercadopago/create_payment_link_controller";
const mercadopagoRouter = Router();

mercadopagoRouter.post("/criar-link", MPCreatePaymentLink);


export default mercadopagoRouter;