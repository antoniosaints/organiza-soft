import {Request, Response} from 'express';
import { ValidationError } from "../../utils/http/lancar_erro";
import { createParcelamento as createParcelamentoSchema, updateParcelamento as updateParcelamentoSchema } from '../../schemas/financeiro/parcelamento_schema';
import { HttpErrorService, prismaService, ResponseService, validateSchema } from '../../services';
export const createParcelamento = async (req: Request, res: Response) => {
  try {
    const validated = validateSchema(createParcelamentoSchema, req.body);
    const received = await prismaService.financeiroParcelamento.create({
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
    const parcelamentos = await prismaService.financeiroParcelamento.findMany({
      where: { contaSistemaId: req.body.contaSistemaId },
    });
    ResponseService.success(res, { data: parcelamentos });
  } catch (error: any) {
    HttpErrorService.hadle(error, res);
  }
};

export const getParcelamento = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const parcelamento = await prismaService.financeiroParcelamento.findUnique({
      where: { id: Number(id), contaSistemaId: req.body.contaSistemaId },
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
    const received = await prismaService.financeiroParcelamento.update({
      where: { id: Number(id), contaSistemaId: req.body.contaSistemaId },
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
    await prismaService.financeiroParcelamento.delete({ where: { id: Number(id), contaSistemaId: req.body.contaSistemaId } });
    ResponseService.success(res, {
      message: "parcelamento excluida com sucesso",
    });
  } catch (error: any) {
    HttpErrorService.hadle(error, res);
  }
};
