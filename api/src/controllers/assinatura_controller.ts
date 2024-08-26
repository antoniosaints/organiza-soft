import { Request, Response } from "express";
import HttpErrorService from "../services/http_error_service";
import prismaService from "../services/prisma_service";
import ResponseService from "../services/response_service";

export const createAssinatura = async (req: Request, res: Response) => {
  const {
    clienteId,
    planoId,
    dataInicio,
    dataFim,
    status,
    dataDesbloqueio,
    dataBloqueio,
  } = req.body;

  try {
    const assinatura = await prismaService.assinatura.create({
      data: {
        clienteId,
        planoId,
        dataInicio: new Date(dataInicio).toISOString(),
        dataFim: new Date(dataFim).toISOString(),
        status,
        ...(dataDesbloqueio && { dataDesbloqueio: new Date(dataDesbloqueio).toISOString() }),
        ...(dataBloqueio && { dataBloqueio: new Date(dataBloqueio).toISOString() }),
      },
    });
    ResponseService.created(res, { data: assinatura });
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

export const updateAssinatura = async (req: Request, res: Response) => {
  const { id } = req.params;
  const {
    clienteId,
    planoId,
    dataInicio,
    dataFim,
    status,
    dataDesbloqueio,
    dataBloqueio,
  } = req.body;

  try {
    const assinatura = await prismaService.assinatura.update({
      where: { id: Number(id) },
      data: {
        clienteId,
        planoId,
        dataInicio: new Date(dataInicio).toISOString(),
        dataFim: new Date(dataFim).toISOString(),
        status,
        ...(dataDesbloqueio && { dataDesbloqueio: new Date(dataDesbloqueio).toISOString() }),
        ...(dataBloqueio && { dataBloqueio: new Date(dataBloqueio).toISOString() }),
      },
    });
    ResponseService.success(res, { data: assinatura });
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
