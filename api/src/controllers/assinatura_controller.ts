import HttpErrorService from "../services/http_error_service";
import prismaService from "../services/prisma_service";
import ResponseService from "../services/response_service";

export const createAssinatura = async (req: any, res: any) => {
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
        dataDesbloqueio: new Date(dataDesbloqueio).toISOString(),
        dataBloqueio: new Date(dataBloqueio).toISOString(),
      },
    });
    ResponseService.created(res, { data: assinatura });
  } catch (error: any) {
    HttpErrorService.hadle(error, res);
  }
};

export const getAssinaturas = async (req: any, res: any) => {
  try {
    const assinaturas = await prismaService.assinatura.findMany();
    ResponseService.success(res, { data: assinaturas });
  } catch (error: any) {
    HttpErrorService.hadle(error, res);
  }
};

export const getAssinatura = async (req: any, res: any) => {
  const { id } = req.params;
  try {
    const assinatura = await prismaService.assinatura.findUnique({
      where: { id: Number(id) },
    });
    ResponseService.success(res, { data: assinatura });
  } catch (error: any) {
    HttpErrorService.hadle(error, res);
  }
};

export const updateAssinatura = async (req: any, res: any) => {
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
        dataDesbloqueio: new Date(dataDesbloqueio).toISOString(),
        dataBloqueio: new Date(dataBloqueio).toISOString(),
      },
    });
    ResponseService.success(res, { data: assinatura });
  } catch (error: any) {
    HttpErrorService.hadle(error, res);
  }
};

export const deleteAssinatura = async (req: any, res: any) => {
  const { id } = req.params;
  try {
    await prismaService.assinatura.delete({ where: { id: Number(id) } });
    ResponseService.success(res, {
      message: "Assinatura excluida com sucesso",
    });
  } catch (error: any) {
    HttpErrorService.hadle(error, res);
  }
};
