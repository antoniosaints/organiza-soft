import { Request, Response } from "express";
import { createUser, updateUser } from "../schemas/usuarios_schema";
import HttpErrorService from "../services/http_error_service";
import prismaService from "../services/prisma_service";
import ResponseService from "../services/response_service";
import validateSchema from "../services/validade_schema";
import { ValidationError } from "../utils/http/lancar_erro";

export const createUsuario = async (req: Request, res: Response) => {
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
    const { limit, page, search } = req.query;
    const offset = (Number(page) - 1) * Number(limit);
    const busca = search as string || "";

    const [items, total] = await Promise.all([
      prismaService.usuario.findMany({
        skip: offset || 0,
        take: Number(limit) || 10,
        where: {
          OR: [
            { nome: { contains: busca } },
            { email: { contains: busca } }
          ],
          contaSistemaId: req.body.contaSistemaId
        },
      }),
      prismaService.usuario.count({
        where: {contaSistemaId: req.body.contaSistemaId},
      }),
    ])

    ResponseService.success(res, { data: items, total });
  } catch (error: any) {
    HttpErrorService.hadle(error, res);
  }
};

export const getUsuario = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const usuario = await prismaService.usuario.findUnique({
      where: { id: Number(id), contaSistemaId: req.body.contaSistemaId },
    });
    ResponseService.success(res, { data: usuario });
  } catch (error: any) {
    HttpErrorService.hadle(error, res);
  }
};

export const updateUsuario = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) throw new ValidationError("ID obrigatorio");
    const usuarioToUpdate = await prismaService.usuario.findUnique({ where: { id: Number(id), contaSistemaId: req.body.contaSistemaId } });
    if (!usuarioToUpdate) throw new ValidationError("Usuário não encontrado!");
    const validated = validateSchema(updateUser, req.body);
    if (usuarioToUpdate.regra === "socio" || usuarioToUpdate.regra === "proprietario") {
      validated.regra = usuarioToUpdate.regra;
      validated.status = "ativo";
    }
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

export const deleteUsuario = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prismaService.usuario.delete({ where: { id: Number(id), contaSistemaId: req.body.contaSistemaId } });
    ResponseService.success(res, { message: "Usuario excluido com sucesso" });
  } catch (error: any) {
    HttpErrorService.hadle(error, res);
  }
};
