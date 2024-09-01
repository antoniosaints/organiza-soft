import {Request, Response} from 'express';
import HttpErrorService from "../services/http_error_service";
import prismaService from "../services/prisma_service";
import ResponseService from "../services/response_service";
import { ValidationError } from "../utils/http/lancar_erro";
import validateSchema from '../services/validade_schema';
import { createParcelamento as createParcelamentoSchema, updateParcelamento as updateParcelamentoSchema } from '../schemas/parcelamento_schema';
export const createParcelamento = async (req: Request, res: Response) => {
  try {
    const validated = validateSchema(createParcelamentoSchema, req.body);
    const received = await prismaService.parcelamento.create({
      data: validated,
    });
    ResponseService.success(res, {
      message: "Parcelamento criada com sucesso",
      data: received,
    });
  } catch (error: any) {
    HttpErrorService.hadle(error, res);
  }
};

export const getParcelamentos = async (req: Request, res: Response) => {
  try {
    const parcelamentos = await prismaService.parcelamento.findMany();
    ResponseService.success(res, { data: parcelamentos });
  } catch (error: any) {
    HttpErrorService.hadle(error, res);
  }
};

export const getParcelamento = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const parcelamento = await prismaService.parcelamento.findUnique({
      where: { id: Number(id) },
    });
    ResponseService.success(res, { data: parcelamento });
  } catch (error: any) {
    HttpErrorService.hadle(error, res);
  }
};

export const updateParcelamento = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    if (!id) throw new ValidationError("ID obrigatorio");
    const validated = validateSchema(updateParcelamentoSchema, req.body);
    const received = await prismaService.parcelamento.update({
      where: { id: Number(id) },
      data: validated,
    });
    ResponseService.success(res, {
      message: "Parcelamento atualizada com sucesso",
      data: received,
    });
  } catch (error: any) {
    HttpErrorService.hadle(error, res);
  }
};

export const deleteParcelamento = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prismaService.parcelamento.delete({ where: { id: Number(id) } });
    ResponseService.success(res, {
      message: "parcelamento excluida com sucesso",
    });
  } catch (error: any) {
    HttpErrorService.hadle(error, res);
  }
};
