import { Request, Response } from "express";
import {
  HttpErrorService,
  prismaService,
  ResponseService,
  validateSchema,
} from "../../services";
import { createProdutoSchema } from "../../schemas/patrimonio/produto_schema";
import { createProdutoCategoriaSchema, updateProdutoCategoriaSchema } from "../../schemas/patrimonio/produto_categoria_schema";

export const getCategorias = async (req: Request, res: Response) => {
  try {
    const { limit, page, search } = req.query;
    const offset = (Number(page) - 1) * Number(limit);
    const busca = search as string || "";

    const [items, total] = await Promise.all([
      prismaService.patrimonioProdutoCategoria.findMany({
        skip: offset || 0,
        take: Number(limit) || 10,
        where: {
          OR: [
            { categoria: { contains: busca } },
            { descricao: { contains: busca } }
          ],
          contaSistemaId: req.body.contaSistemaId
        },
      }),
      prismaService.patrimonioProdutoCategoria.count({
        where: {contaSistemaId: req.body.contaSistemaId},
      }),
    ])
    ResponseService.success(res, { data: items, total });
  } catch (error: any) {
    HttpErrorService.hadle(error, res);
  }
};

export const getCategoria = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const categoria = await prismaService.patrimonioProdutoCategoria.findUnique({
      where: {
        id: Number(id),
        contaSistemaId: req.body.contaSistemaId,
      },
    });
    ResponseService.success(res, { data: categoria });
  } catch (error: any) {
    HttpErrorService.hadle(error, res);
  }
};

export const createCategoria = async (req: Request, res: Response) => {
  try {
    const validated = validateSchema(createProdutoCategoriaSchema, req.body);
    const categoria = await prismaService.patrimonioProdutoCategoria.create({
      data: validated,
    });
    ResponseService.created(res, { data: categoria });
  } catch (error: any) {
    HttpErrorService.hadle(error, res);
  }
};

export const updateCategoria = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const validated = validateSchema(updateProdutoCategoriaSchema, req.body);
    const categoria = await prismaService.patrimonioProdutoCategoria.update({
      where: {
        id: Number(id),
        contaSistemaId: req.body.contaSistemaId,
      },
      data: validated,
    });
    ResponseService.success(res, { data: categoria });
  } catch (error: any) {
    HttpErrorService.hadle(error, res);
  }
};

export const deleteCategoria = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const categoria = await prismaService.patrimonioProdutoCategoria.delete({
      where: {
        id: Number(id),
        contaSistemaId: req.body.contaSistemaId,
      },
    });
    ResponseService.success(res, { data: categoria });
  } catch (error: any) {
    HttpErrorService.hadle(error, res);
  }
};