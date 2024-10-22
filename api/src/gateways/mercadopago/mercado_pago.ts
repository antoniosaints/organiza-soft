import { PaymentResponse } from "mercadopago/dist/clients/payment/commonTypes";
import {
  mercadoPagoPayment,
  mercadoPagoPreference,
} from "../../services/mercado_pago_service";
import { PreferenceResponse } from "mercadopago/dist/clients/preference/commonTypes";
import { IGatewayPayment, IOrderPayment, IOrderPreference } from "../gateway_interface";

export class MercadoPagoGateway implements IGatewayPayment {
  async createPayment(order: IOrderPayment): Promise<PaymentResponse> {
    const payment = await mercadoPagoPayment.create({
      body: {
        transaction_amount: order.amount,
        description: order.customerName,
        payment_method_id: "pix",
        notification_url: order.webhookUrl,
        external_reference: order.id,
        payer: {
          email: order.customerEmail,
          first_name: order.customerName,
        },
      },
      requestOptions: {
        idempotencyKey: order.idempotencyKey,
      },
    });
    return payment;
  }

  async getPayment(id: string): Promise<PaymentResponse> {
    const payment = await mercadoPagoPayment.get({ id });
    return payment;
  }

  async createPreference(order: IOrderPreference): Promise<PreferenceResponse> {
    const payment = await mercadoPagoPreference.create({
      body: {
        items: [
          {
            id: "1",
            title: order.product,
            unit_price: order.amount,
            quantity: order.quantity,
          },
        ],
        payment_methods: {
          excluded_payment_methods: [{ id: "ticket" }],
          installments: 4,
        },
        back_urls: {
          success: "http://localhost:3000",
          failure: "http://localhost:3000",
          pending: "http://localhost:3000",
        },
        auto_return: "approved",
        notification_url: order.webhookUrl,
        external_reference: order.id,
        payer: {
          name: order.customerName,
          email: order.customerEmail,
        },
      },
    });
    return payment;
  }
}
