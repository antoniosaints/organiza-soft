import { Request, Response } from "express";
import {
  HttpErrorService,
  prismaService,
  ResponseService,
  validateSchema,
} from "../../services";
import { createProdutoSchema } from "../../schemas/patrimonio/produto_schema";

export const getProdutos = async (req: Request, res: Response) => {
  try {
    const produtos = await prismaService.patrimonioProdutos.findMany({
      where: {
        contaSistemaId: req.body.contaSistemaId,
      },
    });
    ResponseService.success(res, { data: produtos });
  } catch (error: any) {
    HttpErrorService.hadle(error, res);
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
  }
};

export const createProduto = async (req: Request, res: Response) => {
  try {
    const validated = validateSchema(createProdutoSchema, req.body);
    const produtos = await prismaService.patrimonioProdutos.create({
      data: validated,
    });
    ResponseService.created(res, { data: produtos });
  } catch (error: any) {
    HttpErrorService.hadle(error, res);
  }
};

export const updateProduto = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const validated = validateSchema(createProdutoSchema, req.body);
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
  }
};