import { PaymentResponse } from "mercadopago/dist/clients/payment/commonTypes";
import { PreferenceResponse } from "mercadopago/dist/clients/preference/commonTypes";
import {
  IGatewayPayment,
  IOrderPayment,
  IOrderPreference,
} from "../gateway_interface";
import "dotenv/config";
import { MercadoPagoPayment, MercadoPagoPreference } from "../../../services/financeiro/mercado_pago_service";

export class MercadoPagoGateway implements IGatewayPayment {
  constructor (readonly accountId: number) {}
  async createPayment(order: IOrderPayment): Promise<PaymentResponse> {
    const MPPayment = await MercadoPagoPayment(this.accountId);
    const payment = await MPPayment.create({
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
    const MPPayment = await MercadoPagoPayment(this.accountId);
    const payment = await MPPayment.get({ id });
    return payment;
  }

  async createPreference(order: IOrderPreference): Promise<PreferenceResponse> {
    const baseUrlFront = process.env.BASE_URL_FRONT || "";
    const MPPreference = await MercadoPagoPreference(this.accountId);
    const payment = await MPPreference.create({
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
