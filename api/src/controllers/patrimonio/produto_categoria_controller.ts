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
    const categorias = await prismaService.patrimonioProdutoCategoria.findMany({
      where: {
        contaSistemaId: req.body.contaSistemaId,
      },
    });
    ResponseService.success(res, { data: categorias });
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