import { Request, Response } from "express";
import {
  createPlano as createPlanoSchema,
  updatePlano as updatePlanoSchema,
} from "../../schemas/assinaturas/plano_schema";
import {
  HttpErrorService,
  prismaService,
  ResponseService,
  validateSchema,
} from "../../services";
export const createPlano = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const validated = validateSchema(createPlanoSchema, req.body);
    const plano = await prismaService.assinaturaPlano.create({
      data: validated,
    });
    ResponseService.created(res, {
      message: "Plano criado com sucesso",
      data: plano,
    });
  } catch (error: any) {
    HttpErrorService.hadle(error, res);
  } finally {
    await prismaService.$disconnect();
  }
};

export const getPlanos = async (req: Request, res: Response) => {
  try {
    const planos = await prismaService.assinaturaPlano.findMany({
      where: {
        contaSistemaId: req.body.contaSistemaId,
      },
    });
    ResponseService.success(res, { data: planos });
  } catch (error: any) {
    HttpErrorService.hadle(error, res);
  } finally {
    await prismaService.$disconnect();
  }
};

export const getPlano = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const plano = await prismaService.assinaturaPlano.findUnique({
      where: { id: Number(id), contaSistemaId: req.body.contaSistemaId },
    });
    ResponseService.success(res, { data: plano });
  } catch (error: any) {
    HttpErrorService.hadle(error, res);
  } finally {
    await prismaService.$disconnect();
  }
};

export const updatePlano = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const validated = validateSchema(updatePlanoSchema, req.body);
    const plano = await prismaService.assinaturaPlano.update({
      where: { id: Number(id), contaSistemaId: req.body.contaSistemaId },
      data: validated,
    });
    ResponseService.success(res, {
      message: "Plano atualizado com sucesso",
      data: plano,
    });
  } catch (error: any) {
    HttpErrorService.hadle(error, res);
  } finally {
    await prismaService.$disconnect();
  }
};

export const deletePlano = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prismaService.assinaturaPlano.delete({
      where: { id: Number(id), contaSistemaId: req.body.contaSistemaId },
    });
    ResponseService.success(res, { message: "Plano excluido com sucesso" });
  } catch (error: any) {
    HttpErrorService.hadle(error, res);
  } finally {
    await prismaService.$disconnect();
  }
};
