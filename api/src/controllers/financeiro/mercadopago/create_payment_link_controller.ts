import { Request, Response } from "express";
import { mercadoPagoPreference } from "../../../services/mercado_pago_service";

interface IOrder {
    amount: number;
    customerEmail: string;
    customerName: string;
    product: string;
    quantity: number;
}

export async function MPCreatePaymentLink(req: Request, res: Response) {
  try {
    const order: IOrder = req.body;
    const payment = await mercadoPagoPreference.create({
      body: {
        items: [
          {
            id: "1",
            title: order.product,
            unit_price: order.amount,
            quantity: order.quantity
          }
        ],
        payment_methods: {
          excluded_payment_methods: [
            {id: "ticket"}
          ],
          installments: 4
        }, back_urls: {
          success: "http://localhost:3000",
          failure: "http://localhost:3000",
          pending: "http://localhost:3000"
        },
        auto_return: "approved",
        notification_url: "http://localhost:3000",
        external_reference: "cas20182018",
        payer: {
          email: order.customerEmail
        }
      }
    });

    return res.json(payment);
  } catch (error) {
    console.error("Erro ao criar o pagamento:", error);
    throw error;
  }
}
