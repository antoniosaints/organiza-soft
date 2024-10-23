import { Request, Response } from "express";
import {
  HttpErrorService,
  prismaService,
  ResponseService,
  validateSchema,
} from "../../services";
import {
  createArmazenSchema,
  updateArmazenSchema,
} from "../../schemas/patrimonio/armazens_schema";

export const getArmazens = async (req: Request, res: Response) => {
  try {
    const { limit, page, search } = req.query;
    const offset = (Number(page) - 1) * Number(limit);
    const busca = (search as string) || "";

    const [items, total] = await Promise.all([
      prismaService.patrimonioArmazenamentos.findMany({
        skip: offset || 0,
        take: Number(limit) || 10,
        where: {
          OR: [
            { armazen: { contains: busca } },
            { local: { contains: busca } },
          ],
          contaSistemaId: req.body.contaSistemaId,
        },
      }),
      prismaService.patrimonioArmazenamentos.count({
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

export const getArmazen = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = await prismaService.patrimonioArmazenamentos.findUnique({
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

export const createArmazen = async (req: Request, res: Response) => {
  try {
    const validated = validateSchema(createArmazenSchema, req.body);
    const data = await prismaService.patrimonioArmazenamentos.create({
      data: validated,
    });
    ResponseService.created(res, { data });
  } catch (error: any) {
    HttpErrorService.hadle(error, res);
  } finally {
    await prismaService.$disconnect();
  }
};

export const updateArmazen = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const validated = validateSchema(updateArmazenSchema, req.body);
    const data = await prismaService.patrimonioArmazenamentos.update({
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

export const deleteArmazen = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = await prismaService.patrimonioArmazenamentos.delete({
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
