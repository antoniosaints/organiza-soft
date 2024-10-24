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
import "dotenv/config";
export const getVendas = async (req: Request, res: Response) => {
  try {
    const { limit, page, search, startDate, endDate } = req.query;
    const offset = (Number(page) - 1) * Number(limit);
    const busca = (search as string);

    const [items, total] = await Promise.all([
      prismaService.vendas.findMany({
        skip: offset || 0,
        take: Number(limit) || 10,
        include: {
          Cliente: true,
        },
        where: {
          AND: [
            busca
              ? {
                  OR: [
                    { descricao: { contains: busca } },
                    { uniqueId: { contains: busca } },
                    { Cliente: { nome: { contains: busca } } },
                    {
                      VendasRelatorios: {
                        some: { produto: { contains: busca } },
                      },
                    },
                    { metodoPagamento: { contains: busca } },
                  ],
                }
              : {},
            startDate && endDate
              ? {
                  dataCriacao: {
                    ...(startDate
                      ? { gte: new Date(startDate as string).toISOString() }
                      : {}),
                    ...(endDate ? { lte: new Date(endDate as string).toISOString() } : {}),
                  },
                }
              : {},
            { contaSistemaId: req.body.contaSistemaId },
          ],
        },
      }),

      prismaService.vendas.count({
        where: { contaSistemaId: req.body.contaSistemaId },
      }),
    ]);
    ResponseService.success(res, { data: items, total });
  } catch (error: any) {
    HttpErrorService.hadle(error, res);
  } finally {
    await prismaService.$disconnect();
  }
};
export const getVenda = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const produto = await prismaService.vendas.findUnique({
      where: {
        id: Number(id),
        contaSistemaId: req.body.contaSistemaId,
      },
    });
    ResponseService.success(res, { data: produto });
  } catch (error: any) {
    HttpErrorService.hadle(error, res);
  } finally {
    await prismaService.$disconnect();
  }
};
export const createVenda = async (req: Request, res: Response) => {
  try {
    const validated = validateSchema(VendaBodySchema, req.body);

    const data = await prismaService.$transaction(async (prisma) => {
      const valorTotal = validated.itens.reduce((total, item) => {
        return total + item.quantidade * item.preco;
      }, 0);

      const valorDesconto = valorTotal * (validated.desconto ?? 0);

      const venda = await prisma.vendas.create({
        data: {
          contaSistemaId: validated.contaSistemaId,
          metodoPagamento: validated.formaPagamento,
          status: "pago",
          descricao: validated.descricao,
          uniqueId: generateUniqueIdWithPrefix("vnd"),
          valor: valorTotal,
          desconto: validated.desconto,
          valorDesconto: valorDesconto,
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
export const createCheckoutMercadopagoVenda = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;
    const MercadoPago = new MercadoPagoGateway();
    const checkout = await prismaService.$transaction(async (prisma) => {
      await prisma.vendas.update({
        where: { id: Number(id), contaSistemaId: req.body.contaSistemaId },
        data: {
          status: "pendente",
        },
      });
      const venda = await prisma.vendas.findUnique({
        where: { id: Number(id), contaSistemaId: req.body.contaSistemaId },
        include: {
          VendasRelatorios: true,
        },
      });

      const cliente = await prisma.cliente.findUnique({
        where: {
          id: Number(venda?.clienteId),
          contaSistemaId: req.body.contaSistemaId,
        },
      });

      const checkout = await MercadoPago.createPreference({
        customerEmail: cliente?.email!,
        customerName: cliente?.nome!,
        description: venda?.descricao!,
        idempotencyKey: generateUniqueIdWithPrefix("key"),
        maxInstallments: 6,
        product: "Venda de produtos - Organizasoft",
        webhookUrl: `${process.env.BASE_URL}/mercadopago/webhook`,
        id: venda?.uniqueId!,
        itens: (venda?.VendasRelatorios ?? []).map((item) => ({
          id: `produto-${item.id}`,
          title: item.produto,
          quantity: item.quantidade,
          unit_price: item.preco,
        })),
      });

      return checkout.init_point;
    });
    ResponseService.success(
      res,
      { data: checkout },
      "Checkout criado com sucesso"
    );
  } catch (error: any) {
    HttpErrorService.hadle(error, res);
  } finally {
    await prismaService.$disconnect();
  }
};
export const createPixMercadopagoVenda = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;
    const MercadoPago = new MercadoPagoGateway();
    const checkout = await prismaService.$transaction(async (prisma) => {
      await prisma.vendas.update({
        where: { id: Number(id), contaSistemaId: req.body.contaSistemaId },
        data: {
          status: "pendente",
          metodoPagamento: "pix",
        },
      });
      const venda = await prisma.vendas.findUnique({
        where: { id: Number(id), contaSistemaId: req.body.contaSistemaId },
        include: {
          VendasRelatorios: true,
        },
      });

      const cliente = await prisma.cliente.findUnique({
        where: {
          id: Number(venda?.clienteId),
          contaSistemaId: req.body.contaSistemaId,
        },
      });

      const valorTotal =
        (venda?.VendasRelatorios ?? []).reduce(
          (total, item) => total + item.quantidade * item.preco,
          0
        ) *
        (1 - (venda?.desconto ?? 0));

      const checkout = await MercadoPago.createPayment({
        customerEmail: cliente?.email!,
        customerName: cliente?.nome!,
        description: venda?.descricao!,
        idempotencyKey: generateUniqueIdWithPrefix("key"),
        product: "Venda de produtos - Organizasoft",
        webhookUrl: `${process.env.BASE_URL}/mercadopago/webhook`,
        id: venda?.uniqueId!,
        amount: Number(valorTotal.toFixed(2)),
      });

      return checkout.point_of_interaction?.transaction_data?.ticket_url;
    });
    ResponseService.success(
      res,
      { data: checkout },
      "Checkout criado com sucesso"
    );
  } catch (error: any) {
    HttpErrorService.hadle(error, res);
  } finally {
    await prismaService.$disconnect();
  }
};
export const deleteVenda = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const produtos = await prismaService.vendas.delete({
      where: {
        id: Number(id),
        contaSistemaId: req.body.contaSistemaId,
      },
    });
    ResponseService.success(res, { data: produtos });
  } catch (error: any) {
    HttpErrorService.hadle(error, res);
  } finally {
    await prismaService.$disconnect();
  }
};
