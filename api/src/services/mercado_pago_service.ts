import { MercadoPagoConfig, Payment, Preference } from 'mercadopago';

const mercadopagoconfig = new MercadoPagoConfig({ accessToken: 'TEST-4863654432328004-092420-8e2602867e80824f2a210d1b9dbcf885-284774372', options: { timeout: 5000, idempotencyKey: '@organizasoft_idempotencyKey' } });

export const mercadoPagoPayment = new Payment(mercadopagoconfig);
export const mercadoPagoPreference = new Preference(mercadopagoconfig);