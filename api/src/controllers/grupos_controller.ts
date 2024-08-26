import {Request, Response} from 'express';
import HttpErrorService from "../services/http_error_service";
import prismaService from "../services/prisma_service";
import ResponseService from "../services/response_service";

export const createGrupos = async (req: Request, res: Response) => {
  const { grupo, cor } = req.body;
  try {
    const grupos = await prismaService.grupos.create({
      data: { grupo, cor },
    });
    ResponseService.created(res, {
      message: "Grupo criado com sucesso",
      data: grupos,
    });
  } catch (error: any) {
    HttpErrorService.hadle(error, res);
  }
};

export const getGrupos = async (req: Request, res: Response) => {
  try {
    const grupos = await prismaService.grupos.findMany();
    ResponseService.success(res, { data: grupos });
  } catch (error: any) {
    HttpErrorService.hadle(error, res);
  }
};

export const getGrupo = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const grupos = await prismaService.grupos.findUnique({
      where: { id: Number(id) },
      include: {
          Permissoes: {
            select: {
                Permissao: {
                    select: {
                        slug: true
                    }
                }
            }
          },
      }
    });
    ResponseService.success(res, { data: grupos });
  } catch (error: any) {
    HttpErrorService.hadle(error, res);
  }
};

export const updateGrupo = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { grupo, cor } = req.body;
  try {
    const grupos = await prismaService.grupos.update({
      where: { id: Number(id) },
      data: { grupo, cor },
    });
    ResponseService.success(res, {
      message: "Grupo atualizado com sucesso",
      data: grupos,
    });
  } catch (error: any) {
    HttpErrorService.hadle(error, res);
  }
};

export const deletegrupos = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prismaService.grupos.delete({ where: { id: Number(id) } });
    ResponseService.success(res, { message: "Grupo excluido com sucesso" });
  } catch (error: any) {
    HttpErrorService.hadle(error, res);
  }
};
