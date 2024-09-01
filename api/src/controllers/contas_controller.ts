import { Request, Response } from 'express';
import HttpErrorService from "../services/http_error_service";
import prismaService from "../services/prisma_service";
import ResponseService from "../services/response_service";
import validateSchema from '../services/validade_schema';
import { createConta as createContaSchema, updateConta as updateContaSchema } from '../schemas/conta_schema';
export const createConta = async (req: Request, res: Response) => {
  
  try {
    const validated = validateSchema(createContaSchema, req.body);
    const data = await prismaService.contas.create({
      data: validated,
    });
    ResponseService.created(res, {
      message: "Conta criada com sucesso",
      data: data,
    });
  } catch (error: any) {
    HttpErrorService.hadle(error, res);
  }
};

export const getContas = async (req: Request, res: Response) => {
  try {
    const contas = await prismaService.contas.findMany();
    ResponseService.success(res, { data: contas });
  } catch (error: any) {
    HttpErrorService.hadle(error, res);
  }
};

export const getConta = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    if (!id) throw new Error("ID obrigatorio");
    const conta = await prismaService.contas.findUnique({
      where: { id: Number(id) }
    });
    ResponseService.success(res, { data: conta });
  } catch (error: any) {
    HttpErrorService.hadle(error, res);
  }
};

export const updateConta = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const validated = validateSchema(updateContaSchema, req.body);
    const data = await prismaService.contas.update({
      where: { id: Number(id) },
      data: validated,
    });
    ResponseService.success(res, {
      message: "Conta atualizada com sucesso",
      data: data,
    });
  } catch (error: any) {
    HttpErrorService.hadle(error, res);
  }
};

export const deleteConta = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const conta = await prismaService.contas.delete({
      where: { id: Number(id) },
    });
    ResponseService.success(res, {
      message: "Conta deletada com sucesso",
      data: conta,
    });
  } catch (error: any) {
    HttpErrorService.hadle(error, res);
  }
};
