import {Request, Response} from 'express';
import HttpErrorService from "../services/http_error_service";
import prismaService from "../services/prisma_service";
import ResponseService from "../services/response_service";
import { ValidationError } from "../utils/http/lancar_erro";
import { createPermissoes as createPermissoesSchema, updatePermissoes as updatePermissoesSchema } from '../schemas/permissoes_schema';
import validateSchema from '../services/validade_schema';
export const createPermissoes = async (req: Request, res: Response) => {
  
  try {
    const validated = validateSchema(createPermissoesSchema, req.body);
    const permissoes = await prismaService.permissoes.create({
      data: validated,
    });
    ResponseService.created(res, {
      message: "Permissão criada com sucesso",
      data: permissoes,
    });
  } catch (error: any) {
    HttpErrorService.hadle(error, res);
  }
};

export const getPermissoes = async (req: Request, res: Response) => {
  try {
    const permissoes = await prismaService.permissoes.findMany();
    ResponseService.success(res, { data: permissoes });
  } catch (error: any) {
    HttpErrorService.hadle(error, res);
  }
};

export const getPermissao = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const permissoes = await prismaService.permissoes.findUnique({
      where: { id: Number(id) },
    });
    ResponseService.success(res, { data: permissoes });
  } catch (error: any) {
    HttpErrorService.hadle(error, res);
  }
};

export const updatePermissao = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) throw new ValidationError("ID obrigatorio");
    const validated = validateSchema(updatePermissoesSchema, req.body);
    const permissoes = await prismaService.permissoes.update({
      where: { id: Number(id) },
      data: validated,
    });
    ResponseService.success(res, {
      message: "Permissão atualizada com sucesso",
      data: permissoes,
    });
  } catch (error: any) {
    HttpErrorService.hadle(error, res);
  }
};

export const deletepermissoes = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prismaService.permissoes.delete({ where: { id: Number(id) } });
    ResponseService.success(res, { message: "Grupo excluido com sucesso" });
  } catch (error: any) {
    HttpErrorService.hadle(error, res);
  }
};
