import { Request, Response } from "express";
import {
  HttpErrorService,
  prismaService,
  ResponseService,
  validateSchema,
} from "../../services";
import { VendaBodySchema } from "../../schemas/vendas/vendas_body_schema";
import { generateUniqueIdWithPrefix } from "../../utils/tools/UniqueId";
import { MercadoPagoGateway } from "../../gateways/mercadopago/mercado_pago";

export const createVenda = async (req: Request, res: Response) => {
  try {
    const validated = validateSchema(VendaBodySchema, req.body);

    const data = await prismaService.$transaction(async (prisma) => {
      const venda = await prisma.vendas.create({
        data: {
          contaSistemaId: validated.contaSistemaId,
          metodoPagamento: validated.formaPagamento,
          status: "pago",
          descricao: validated.descricao,
          uniqueId: generateUniqueIdWithPrefix("vnd"),
          valor: validated.itens.reduce((total, item) => {
            return total + item.quantidade * item.preco;
          }, 0),
          clienteId: validated.cliente,
          vendedorId: validated.vendedor,
        },
      });
      const itens = await prisma.vendasRelatorios.createMany({
        data: validated.itens.map((produto) => ({
          vendaId: venda.id,
          produtoId: Number(produto.id),
          quantidade: Number(produto.quantidade),
          contaSistemaId: validated.contaSistemaId,
          preco: Number(produto.preco),
          total: Number(produto.preco) * Number(produto.quantidade),
          produto: produto.produto,
        })),
      });
      return [venda, itens];
    });
    ResponseService.created(res, { data }, "Venda criada com sucesso");
  } catch (error: any) {
    HttpErrorService.hadle(error, res);
  } finally {
    await prismaService.$disconnect();
  }
};

export const createCheckoutMercadopagoVenda = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const MercadoPago = new MercadoPagoGateway();
        const checkout = await prismaService.$transaction(async (prisma) => {
            await prisma.vendas.update({
                where: { id: Number(id), contaSistemaId: req.body.contaSistemaId },
                data: {
                    status: "pendente"
                }
            })
            const venda = await prisma.vendas.findUnique({
                where: { id: Number(id), contaSistemaId: req.body.contaSistemaId },
                include: {
                    VendasRelatorios: true
                }
            })

            const cliente = await prisma.cliente.findUnique({
                where: { id: Number(venda?.clienteId), contaSistemaId: req.body.contaSistemaId },
            })

            const checkout = await MercadoPago.createPreference({
                customerEmail: cliente?.email!,
                customerName: cliente?.nome!,
                description: venda?.descricao!,
                idempotencyKey: generateUniqueIdWithPrefix("key"),
                maxInstallments: 6,
                product: "Venda de produtos - Organizasoft",
                webhookUrl: `https://0737-2804-2424-4000-3-6449-f406-c9a2-1de.ngrok-free.app/mercadopago/webhook`,
                id: venda?.uniqueId!,
                itens: (venda?.VendasRelatorios ?? []).map((item) => ({
                    id: `produto-${item.id}`,
                    title: item.produto,
                    quantity: item.quantidade,
                    unit_price: item.preco,
                })),
            })

            return checkout;
        })
        ResponseService.success(res, { data: checkout }, "Checkout criado com sucesso");
    }catch (error: any) {
        HttpErrorService.hadle(error, res);
    } finally {
        await prismaService.$disconnect();
    }
}