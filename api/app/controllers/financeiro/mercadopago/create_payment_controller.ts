import { Request, Response } from "express";
import { MercadoPagoGateway } from "../../../gateways/mercadopago/mercado_pago";
import { IOrderPayment } from "../../../gateways/gateway_interface";

const getRandomString = (): string => {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
};

export async function MPCreatePaymentLink(req: Request, res: Response) {
  try {
    const order: IOrderPayment = req.body;
    order.idempotencyKey = getRandomString();
    const Gateway = new MercadoPagoGateway();
    const { point_of_interaction } = await Gateway.createPayment(order);
    return res.json({
      link: point_of_interaction?.transaction_data?.ticket_url,
    });
  } catch (error) {
    console.error("Erro ao criar o pagamento:", error);
    return res.status(500).json({ message: `Erro ao criar o link de pagamento: ${error}` });
  }
}
