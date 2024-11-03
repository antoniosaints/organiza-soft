import { Request, Response } from "express";
import {
  HttpErrorService,
  prismaService,
  ResponseService,
  validateSchema,
} from "../../services";
import {
  createProdutoSchema,
  updateProdutoSchema,
} from "../../schemas/patrimonio/produto_schema";
import { generateUniqueId } from "../../utils/tools/UniqueId";

export const getProdutos = async (req: Request, res: Response) => {
  try {
    const { limit, page, search } = req.query;
    const offset = (Number(page) - 1) * Number(limit);
    const busca = search as string;

    const whereFilter = {
      AND: [
        busca
          ? {
              OR: [
                { produto: { contains: busca } },
                { sku: { contains: busca } },
                { descricao: { contains: busca } },
                { Categoria: { categoria: { contains: busca } } },
              ],
            }
          : {},
        {
          contaSistemaId: req.body.contaSistemaId,
        },
      ],
    };

    const [items, total] = await Promise.all([
      prismaService.patrimonioProdutos.findMany({
        skip: offset || 0,
        take: Number(limit) || 10,
        include: {
          Categoria: {
            select: {
              categoria: true,
              cor: true,
              descricao: true,
            },
          },
        },
        where: whereFilter,
      }),
      prismaService.patrimonioProdutos.count({
        where: whereFilter,
      }),
    ]);
    ResponseService.success(res, { data: items, total });
  } catch (error: any) {
    HttpErrorService.hadle(error, res);
  } finally {
    await prismaService.$disconnect();
  }
};

export const getProduto = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const produto = await prismaService.patrimonioProdutos.findUnique({
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

export const createProduto = async (req: Request, res: Response) => {
  try {
    req.body.produtoId = generateUniqueId("prd_");
    const validated = validateSchema(createProdutoSchema, req.body);
    const produtos = await prismaService.patrimonioProdutos.create({
      data: validated,
    });
    ResponseService.created(res, { data: produtos });
  } catch (error: any) {
    HttpErrorService.hadle(error, res);
  } finally {
    await prismaService.$disconnect();
  }
};

export const updateProduto = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const validated = validateSchema(updateProdutoSchema, req.body);
    const produtos = await prismaService.patrimonioProdutos.update({
      where: {
        id: Number(id),
        contaSistemaId: req.body.contaSistemaId,
      },
      data: validated,
    });
    ResponseService.success(res, { data: produtos });
  } catch (error: any) {
    HttpErrorService.hadle(error, res);
  } finally {
    await prismaService.$disconnect();
  }
};

export const deleteProduto = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const produtos = await prismaService.patrimonioProdutos.delete({
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
