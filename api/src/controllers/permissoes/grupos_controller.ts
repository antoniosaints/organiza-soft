import {Request, Response} from 'express';
import HttpErrorService from "../../services/http_error_service";
import prismaService from "../../services/prisma_service";
import ResponseService from "../../services/response_service";
import { createGrupos as createGruposSchema, updateGrupos as updateGruposSchema } from '../../schemas/permissoes/grupos_schema';
import validateSchema from '../../services/validade_schema';
export const createGrupos = async (req: Request, res: Response) => {
  
  try {
    const validated = validateSchema(createGruposSchema, req.body);
    const grupos = await prismaService.permissoesGrupos.create({
      data: validated,
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
    const grupos = await prismaService.permissoesGrupos.findMany();
    ResponseService.success(res, { data: grupos });
  } catch (error: any) {
    HttpErrorService.hadle(error, res);
  }
};

export const getGrupo = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const grupos = await prismaService.permissoesGrupos.findUnique({
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
  
  try {
    const validated = validateSchema(updateGruposSchema, req.body);
    const grupos = await prismaService.permissoesGrupos.update({
      where: { id: Number(id) },
      data: validated,
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
    await prismaService.permissoesGrupos.delete({ where: { id: Number(id) } });
    ResponseService.success(res, { message: "Grupo excluido com sucesso" });
  } catch (error: any) {
    HttpErrorService.hadle(error, res);
  }
};
