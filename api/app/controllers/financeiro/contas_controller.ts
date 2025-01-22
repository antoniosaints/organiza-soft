import { Request, Response } from "express";
import {
  createConta as createContaSchema,
  updateConta as updateContaSchema,
} from "../../schemas/financeiro/conta_schema";
import {
  HttpErrorService,
  prismaService,
  ResponseService,
  validateSchema,
} from "../../services";
export const createConta = async (req: Request, res: Response) => {
  try {
    const validated = validateSchema(createContaSchema, req.body);
    const data = await prismaService.financeiroContas.create({
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
    const { search, limit, page } = req.query;
    const busca = search as string;
    const offset = (Number(page) - 1) * Number(limit);
    const contas = await prismaService.financeiroContas.findMany({
      skip: offset || 0,
      take: Number(limit) || 10,
      where: {
        AND: [
          busca
            ? {
                OR: [
                  { descricao: { contains: busca } },
                  { conta: { contains: busca } },
                ],
              }
            : {},
          {
            contaSistemaId: req.body.contaSistemaId,
          },
        ],
      },
    });
    ResponseService.success(res, { data: contas });
  } catch (error: any) {
    HttpErrorService.hadle(error, res);
  }
};

export const getConta = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    if (!id) throw new Error("ID obrigatorio");
    const conta = await prismaService.financeiroContas.findUnique({
      where: { id: Number(id), contaSistemaId: req.body.contaSistemaId },
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
    const data = await prismaService.financeiroContas.update({
      where: { id: Number(id), contaSistemaId: req.body.contaSistemaId },
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
    const conta = await prismaService.financeiroContas.delete({
      where: { id: Number(id), contaSistemaId: req.body.contaSistemaId },
    });
    ResponseService.success(res, {
      message: "Conta deletada com sucesso",
      data: conta,
    });
  } catch (error: any) {
    HttpErrorService.hadle(error, res);
  }
};
