import { Request, Response } from "express";
import { createUser, updateUser } from "../schemas/usuarios_schema";
import HttpErrorService from "../services/http_error_service";
import prismaService from "../services/prisma_service";
import ResponseService from "../services/response_service";
import validateSchema from "../services/validade_schema";
import { ValidationError } from "../utils/http/lancar_erro";

export const createUsuario = async (req: any, res: any) => {
  try {
    const validated = validateSchema(createUser, req.body);
    const usuario = await prismaService.usuario.create({
      data: validated,
    });
    ResponseService.success(res, {
      message: "Usuario criado com sucesso",
      data: usuario,
    });
  } catch (error: any) {
    HttpErrorService.hadle(error, res);
  }
};

export const getUsuarios = async (req: Request, res: Response) => {
  try {
    const {limit, perPage, page} = req.query;
    const offset = (Number(page) - 1) * Number(perPage);

    const usuarios = await prismaService.usuario.findMany({
      skip: offset || 0,
      take: Number(limit) || 10,
      orderBy: { nome: "asc" },
    });

    ResponseService.success(res, { data: usuarios });
  } catch (error: any) {
    HttpErrorService.hadle(error, res);
  }
};

export const getUsuario = async (req: any, res: any) => {
  const { id } = req.params;
  try {
    const usuario = await prismaService.usuario.findUnique({
      where: { id: Number(id) },
    });
    ResponseService.success(res, { data: usuario });
  } catch (error: any) {
    HttpErrorService.hadle(error, res);
  }
};

export const updateUsuario = async (req: any, res: any) => {
  const { id } = req.params;
  try {
    if (!id) throw new ValidationError("ID obrigatorio");
    const validated = validateSchema(updateUser, req.body);
    if (Number(id) === 1) validated.regra = "admin";
    const usuario = await prismaService.usuario.update({
      where: { id: Number(id) },
      data: validated,
    });
    ResponseService.success(res, {
      message: "Usuario atualizado com sucesso",
      data: usuario,
    });
  } catch (error: any) {
    HttpErrorService.hadle(error, res);
  }
};

export const deleteUsuario = async (req: any, res: any) => {
  const { id } = req.params;
  try {
    await prismaService.usuario.delete({ where: { id: Number(id) } });
    ResponseService.success(res, { message: "Usuario excluido com sucesso" });
  } catch (error: any) {
    HttpErrorService.hadle(error, res);
  }
};
