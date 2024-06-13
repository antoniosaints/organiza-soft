import HttpErrorService from "../services/http_error_service";
import prismaService from "../services/prisma_service";
import ResponseService from "../services/response_service";
import { ValidationError } from "../utils/http/lancar_erro";

export const createPermissoes = async (req: any, res: any) => {
  const { permissao, status, slug } = req.body;
  try {
    const permissoes = await prismaService.permissoes.create({
      data: { permissao, status, slug },
    });
    ResponseService.created(res, {
      message: "Permissão criada com sucesso",
      data: permissoes,
    });
  } catch (error: any) {
    HttpErrorService.hadle(error, res);
  }
};

export const getPermissoes = async (req: any, res: any) => {
  try {
    const permissoes = await prismaService.permissoes.findMany();
    ResponseService.success(res, { data: permissoes });
  } catch (error: any) {
    HttpErrorService.hadle(error, res);
  }
};

export const getPermissao = async (req: any, res: any) => {
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

export const updatePermissao = async (req: any, res: any) => {
  try {
    const { id } = req.params;
    if (!id) throw new ValidationError("ID obrigatorio");
    const { status, permissao } = req.body;
    const permissoes = await prismaService.permissoes.update({
      where: { id: Number(id) },
      data: { status, permissao },
    });
    ResponseService.success(res, {
      message: "Permissão atualizada com sucesso",
      data: permissoes,
    });
  } catch (error: any) {
    HttpErrorService.hadle(error, res);
  }
};

export const deletepermissoes = async (req: any, res: any) => {
  const { id } = req.params;
  try {
    await prismaService.permissoes.delete({ where: { id: Number(id) } });
    ResponseService.success(res, { message: "Grupo excluido com sucesso" });
  } catch (error: any) {
    HttpErrorService.hadle(error, res);
  }
};
