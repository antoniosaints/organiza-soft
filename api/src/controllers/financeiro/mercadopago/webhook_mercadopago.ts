import { Request, Response } from "express";
import { HttpErrorService } from "../../../services";
import { MercadoPagoGateway } from "../../../gateways/mercadopago/mercado_pago";
import { padronizarStatusGateway } from "../../../gateways/status_mapper";

interface IMercadoPagoBody {
    action: string
    data: { id: string }
    data_created: string
    id: number
    type: string
}
export const MPWebhookPagamentos = async (req: Request, res: Response) => {
    try {
        const data: IMercadoPagoBody = req.body;
        const Gateway = new MercadoPagoGateway();
        if (data.type === 'payment' && data.action === 'payment.updated' && data.data.id) {
            const { external_reference, status, payment_method_id, id: paymentId } = await Gateway.getPayment(data.data.id);
            console.log({
                id: external_reference,
                status: padronizarStatusGateway("mercadoPago", status!),
                tipo_pagamento: payment_method_id,
                pagamento: paymentId
            });
        }
        return res.sendStatus(200);
    }catch (error: any) {
        HttpErrorService.hadle(error, res);
    }
}