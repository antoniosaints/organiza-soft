import { Request, Response } from "express";
import {
  createUser,
  updateUser,
} from "../../schemas/administracao/usuarios_schema";
import { ValidationError } from "../../utils/http/lancar_erro";
import {
  HttpErrorService,
  prismaService,
  ResponseService,
  validateSchema,
} from "../../services";

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
  } finally {
    await prismaService.$disconnect();
  }
};

export const getUsuarios = async (req: Request, res: Response) => {
  try {
    const { limit, page, search } = req.query;
    const offset = (Number(page) - 1) * Number(limit);
    const busca = search as string;

    const [items, total] = await Promise.all([
      prismaService.usuario.findMany({
        skip: offset || 0,
        take: Number(limit) || 10,
        where: {
          AND: [
            busca
              ? {
                  OR: [
                    { nome: { contains: busca } },
                    { email: { contains: busca } },
                  ],
                }
              : {},
            {
              contaSistemaId: req.body.contaSistemaId,
            },
          ],
        },
      }),
      prismaService.usuario.count({
        where: { contaSistemaId: req.body.contaSistemaId },
      }),
    ]);

    ResponseService.success(res, { data: items, total });
  } catch (error: any) {
    HttpErrorService.hadle(error, res);
  } finally {
    await prismaService.$disconnect();
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
  } finally {
    await prismaService.$disconnect();
  }
};

export const updateUsuario = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) throw new ValidationError("ID obrigatorio");
    const usuarioToUpdate = await prismaService.usuario.findUnique({
      where: { id: Number(id), contaSistemaId: req.body.contaSistemaId },
    });
    if (!usuarioToUpdate) throw new ValidationError("Usuário não encontrado!");
    const validated = validateSchema(updateUser, req.body);
    if (["socio", "proprietario"].includes(usuarioToUpdate.regra)) {
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
  } finally {
    await prismaService.$disconnect();
  }
};

export const deleteUsuario = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) throw new ValidationError("ID obrigatorio");
    const usuarioDelete = await prismaService.usuario.findUnique({
      where: { id: Number(id), contaSistemaId: req.body.contaSistemaId },
    });
    const canDelete = ["socio", "proprietario"].includes(
      usuarioDelete?.regra as string
    );
    if (canDelete)
      throw new ValidationError(
        "Esse usuário não pode ser excluído pois ele é um proprietário ou socio!"
      );
    await prismaService.usuario.delete({
      where: { id: Number(id), contaSistemaId: req.body.contaSistemaId },
    });
    ResponseService.success(res, { message: "Usuario excluido com sucesso" });
  } catch (error: any) {
    HttpErrorService.hadle(error, res);
  } finally {
    await prismaService.$disconnect();
  }
};
