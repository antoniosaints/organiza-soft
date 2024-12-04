import { Request, Response } from "express";
import HttpErrorService from "../../services/http/http_error_service";
import prismaService from "../../services/database/prisma_service";
import ResponseService from "../../services/http/response_service";
import {
  createAssinatura as createAssinaturaSchema,
  updateAssinatura as updateAssinaturaSchema,
} from "../../schemas/assinaturas/assinatura_schema";
import { validateSchema } from "../../services";

export const createAssinatura = async (req: Request, res: Response) => {
  try {
    const validated = validateSchema(createAssinaturaSchema, req.body);
    const assinatura = await prismaService.assinatura.create({
      data: validated,
    });
    ResponseService.success(res, {
      message: "Assinatura criada com sucesso",
      data: assinatura,
    });
  } catch (error: any) {
    HttpErrorService.hadle(error, res);
  } finally {
    await prismaService.$disconnect();
  }
};

export const updateAssinatura = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const validated = validateSchema(updateAssinaturaSchema, req.body);
    const assinatura = await prismaService.assinatura.update({
      where: { id: Number(id), contaSistemaId: req.body.contaSistemaId },
      data: validated,
    });
    ResponseService.success(res, {
      message: "Assinatura atualizada com sucesso",
      data: assinatura,
    });
  } catch (error: any) {
    HttpErrorService.hadle(error, res);
  } finally {
    await prismaService.$disconnect();
  }
};

export const getAssinaturas = async (req: Request, res: Response) => {
  try {
    const assinaturas = await prismaService.assinatura.findMany({
      where: { contaSistemaId: req.body.contaSistemaId },
    });
    ResponseService.success(res, { data: assinaturas });
  } catch (error: any) {
    HttpErrorService.hadle(error, res);
  } finally {
    await prismaService.$disconnect();
  }
};

export const getAssinatura = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const assinatura = await prismaService.assinatura.findUnique({
      where: { id: Number(id), contaSistemaId: req.body.contaSistemaId },
    });
    if (assinatura) {
      ResponseService.success(res, { data: assinatura });
    } else {
      ResponseService.notFound(res, "Assinatura não encontrada.");
    }
  } catch (error: any) {
    HttpErrorService.hadle(error, res);
  } finally {
    await prismaService.$disconnect();
  }
};

export const deleteAssinatura = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prismaService.assinatura.delete({
      where: { id: Number(id), contaSistemaId: req.body.contaSistemaId },
    });
    ResponseService.success(res, {
      message: "Assinatura excluída com sucesso",
    });
  } catch (error: any) {
    HttpErrorService.hadle(error, res);
  } finally {
    await prismaService.$disconnect();
  }
};
