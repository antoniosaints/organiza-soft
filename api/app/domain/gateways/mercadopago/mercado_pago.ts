import { PaymentResponse } from "mercadopago/dist/clients/payment/commonTypes";
import { PreferenceResponse } from "mercadopago/dist/clients/preference/commonTypes";
import {
  IGatewayPayment,
  IOrderPayment,
  IOrderPreference,
} from "../gateway_interface";
import "dotenv/config";
import { mercadoPagoPayment, mercadoPagoPreference } from "../../../services/financeiro/mercado_pago_service";

export class MercadoPagoGateway implements IGatewayPayment {
  async createPayment(order: IOrderPayment): Promise<PaymentResponse> {
    const payment = await mercadoPagoPayment.create({
      body: {
        transaction_amount: order.amount,
        description: order.description,
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
    const baseUrlFront = process.env.BASE_URL_FRONT || "";
    const payment = await mercadoPagoPreference.create({
      body: {
        items: order.itens,
        additional_info: order.description,
        payment_methods: {
          excluded_payment_methods: [{ id: "ticket" }],
          installments: order.maxInstallments || 1,
        },
        auto_return: "approved",
        back_urls: {
          success: `${baseUrlFront}/pagamentos/mercadopago/status`,
          failure: `${baseUrlFront}/pagamentos/mercadopago/status`,
          pending: `${baseUrlFront}/pagamentos/mercadopago/status`,
        },
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
