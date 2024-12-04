import { MercadoPagoConfig, Payment, Preference } from 'mercadopago';
import env from '../../configs/env';

const getRandomString = () => {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}
const mercadopagoconfig = new MercadoPagoConfig({ accessToken: env.MERCADOPAGO_SECRETKEY, options: { idempotencyKey: getRandomString() } });

export const mercadoPagoPayment = new Payment(mercadopagoconfig);
export const mercadoPagoPreference = new Preference(mercadopagoconfig);