import { MercadoPagoConfig, Payment, Preference } from 'mercadopago';
import prismaService from '../database/prisma_service';

const getRandomString = () => {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}
export const MercadoPagoPayment = async (accountId: number) => {
    const apiKey = await prismaService.integracoesGateways.findFirst({ where: { contaSistemaId: accountId, gatewayName: "mercadopago" } });
    const mercadopagoconfig = new MercadoPagoConfig({ accessToken: apiKey?.apiSecret || "", options: { idempotencyKey: getRandomString() } });
    return new Payment(mercadopagoconfig);
}
export const MercadoPagoPreference = async (accountId: number) => {
    const apiKey = await prismaService.integracoesGateways.findFirst({ where: { contaSistemaId: accountId, gatewayName: "mercadopago" } });
    const mercadopagoconfig = new MercadoPagoConfig({ accessToken: apiKey?.apiSecret || "", options: { idempotencyKey: getRandomString() } });
    return new Preference(mercadopagoconfig);
}