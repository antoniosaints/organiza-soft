import { Request, Response } from "express";
import {
  HttpErrorService,
  prismaService,
  ResponseService,
  validateSchema,
} from "../../services";
import {
  createFornecedorSchema,
  updateFornecedorSchema,
} from "../../schemas/patrimonio/fornecedores_schema";

export const getFornecedores = async (req: Request, res: Response) => {
  try {
    const { limit, page, search } = req.query;
    const offset = (Number(page) - 1) * Number(limit);
    const busca = (search as string) || "";

    const [items, total] = await Promise.all([
      prismaService.patrimonioFornecedores.findMany({
        skip: offset || 0,
        take: Number(limit) || 10,
        where: {
          OR: [
            { nome: { contains: busca } },
            { cpf_cnpj: { contains: busca } },
            { email: { contains: busca } },
            { contato: { contains: busca } },
          ],
          contaSistemaId: req.body.contaSistemaId,
        },
      }),
      prismaService.patrimonioFornecedores.count({
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

export const getFornecedor = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = await prismaService.patrimonioFornecedores.findUnique({
      where: {
        id: Number(id),
        contaSistemaId: req.body.contaSistemaId,
      },
    });
    ResponseService.success(res, { data });
  } catch (error: any) {
    HttpErrorService.hadle(error, res);
  } finally {
    await prismaService.$disconnect();
  }
};

export const createFornecedor = async (req: Request, res: Response) => {
  try {
    const validated = validateSchema(createFornecedorSchema, req.body);
    const data = await prismaService.patrimonioFornecedores.create({
      data: validated,
    });
    ResponseService.created(res, { data });
  } catch (error: any) {
    HttpErrorService.hadle(error, res);
  } finally {
    await prismaService.$disconnect();
  }
};

export const updateFornecedor = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const validated = validateSchema(updateFornecedorSchema, req.body);
    const data = await prismaService.patrimonioFornecedores.update({
      where: {
        id: Number(id),
        contaSistemaId: req.body.contaSistemaId,
      },
      data: validated,
    });
    ResponseService.success(res, { data });
  } catch (error: any) {
    HttpErrorService.hadle(error, res);
  } finally {
    await prismaService.$disconnect();
  }
};

export const deleteFornecedor = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = await prismaService.patrimonioFornecedores.delete({
      where: {
        id: Number(id),
        contaSistemaId: req.body.contaSistemaId,
      },
    });
    ResponseService.success(res, { data });
  } catch (error: any) {
    HttpErrorService.hadle(error, res);
  } finally {
    await prismaService.$disconnect();
  }
};
