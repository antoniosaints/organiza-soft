import { Request, Response } from 'express';
import HttpErrorService from "../services/http_error_service";
import prismaService from "../services/prisma_service";
import ResponseService from "../services/response_service";
import { ValidationError } from "../utils/http/lancar_erro";

export const createcategoria = async (req: Request, res: Response) => {
  try {
    const { categoria, cor } = req.body;
    const received = await prismaService.categorias.create({
      data: { categoria, cor },
    });
    ResponseService.success(res, {
      message: "Categoria criada com sucesso",
      data: received,
    });
  } catch (error: any) {
    HttpErrorService.hadle(error, res);
  }
};

export const getcategorias = async (req: Request, res: Response) => {
  try {
    const categorias = await prismaService.categorias.findMany();
    ResponseService.success(res, { data: categorias });
  } catch (error: any) {
    HttpErrorService.hadle(error, res);
  }
};

export const getcategoria = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const categoria = await prismaService.categorias.findUnique({
      where: { id: Number(id) },
    });
    ResponseService.success(res, { data: categoria });
  } catch (error: any) {
    HttpErrorService.hadle(error, res);
  }
};

export const updatecategoria = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    if (!id) throw new ValidationError("ID obrigatorio");
    const { categoria, cor } = req.body;
    const received = await prismaService.categorias.update({
      where: { id: Number(id) },
      data: { categoria, cor },
    });
    ResponseService.success(res, {
      message: "Categoria atualizada com sucesso",
      data: received,
    });
  } catch (error: any) {
    HttpErrorService.hadle(error, res);
  }
};

export const deletecategoria = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prismaService.categorias.delete({ where: { id: Number(id) } });
    ResponseService.success(res, { message: "Categoria excluida com sucesso" });
  } catch (error: any) {
    HttpErrorService.hadle(error, res);
  }
};
