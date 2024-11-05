import { Request, Response } from "express";
import { HttpErrorService, prismaService } from "../../../services";
import { MercadoPagoGateway } from "../../../gateways/mercadopago/mercado_pago";
import { padronizarStatusGateway } from "../../../gateways/status_mapper";
import { stat } from "fs";

interface IMercadoPagoBody {
  action: string;
  data: { id: string };
  data_created: string;
  id: number;
  type: string;
}
export const MPWebhookPagamentos = async (req: Request, res: Response) => {
  try {
    const { type, action, data }: IMercadoPagoBody = req.body;
    const Gateway = new MercadoPagoGateway();
    if (type === "payment" && action === "payment.updated" && data.id) {
      const { external_reference, status, payment_method_id } =
        await Gateway.getPayment(data.id);
      await prismaService.$transaction(async (prisma) => {
        const venda = await prisma.vendas.update({
          where: {
            uniqueId: external_reference!,
          },
          data: {
            status: padronizarStatusGateway("mercadoPago", status!),
          },
        });
        await prisma.vendasPagamentos.create({
          data: {
            gatewayId: data.id,
            metodoPagamento: `mercadoPago-${payment_method_id}`,
            statusPagamento: padronizarStatusGateway("mercadoPago", status!),
            valor: Number(venda?.valor),
            contaSistemaId: venda?.contaSistemaId,
            vendaId: venda?.id,
          },
        });
        return venda;
      });
    }
    return res.sendStatus(200);
  } catch (error: any) {
    HttpErrorService.hadle(error, res);
  }
};
