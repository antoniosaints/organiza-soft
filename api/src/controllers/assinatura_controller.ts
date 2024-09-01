import { Request, Response } from "express";
import HttpErrorService from "../services/http_error_service";
import prismaService from "../services/prisma_service";
import ResponseService from "../services/response_service";
import { createAssinatura as createAssinaturaSchema, updateAssinatura as updateAssinaturaSchema } from "../schemas/assinatura_schema"; 
import validateSchema from "../services/validade_schema";

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
  }
};

export const updateAssinatura = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const validated = validateSchema(updateAssinaturaSchema, req.body);
    const assinatura = await prismaService.assinatura.update({
      where: { id: Number(id) },
      data: validated,
    });
    ResponseService.success(res, {
      message: "Assinatura atualizada com sucesso",
      data: assinatura,
    });
  } catch (error: any) {
    HttpErrorService.hadle(error, res);
  }
};

export const getAssinaturas = async (req: Request, res: Response) => {
  try {
    const assinaturas = await prismaService.assinatura.findMany();
    ResponseService.success(res, { data: assinaturas });
  } catch (error: any) {
    HttpErrorService.hadle(error, res);
  }
};

export const getAssinatura = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const assinatura = await prismaService.assinatura.findUnique({
      where: { id: Number(id) },
    });
    if (assinatura) {
      ResponseService.success(res, { data: assinatura });
    } else {
      ResponseService.notFound(res, "Assinatura não encontrada.");
    }
  } catch (error: any) {
    HttpErrorService.hadle(error, res);
  }
};

export const deleteAssinatura = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prismaService.assinatura.delete({ where: { id: Number(id) } });
    ResponseService.success(res, {
      message: "Assinatura excluída com sucesso",
    });
  } catch (error: any) {
    HttpErrorService.hadle(error, res);
  }
};
