import { Request, Response } from "express";
import { IOrderPreference } from "../../../domain/gateways/gateway_interface";
import { MercadoPagoGateway } from "../../../domain/gateways/mercadopago/mercado_pago";

const getRandomString = (): string => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}
export async function MPCreatePreferenceLink(req: Request, res: Response) {
  try {
    const order: IOrderPreference = req.body;
    order.idempotencyKey = getRandomString();
    const Gateway = new MercadoPagoGateway();
    const payment = await Gateway.createPreference(order);
    return res.json({
      link: payment.init_point
    });
  } catch (error) {
    console.error("Erro ao criar o pagamento:", error);
    throw error;
  }
}
