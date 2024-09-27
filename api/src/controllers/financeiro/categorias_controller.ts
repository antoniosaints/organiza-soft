import { Request, Response } from 'express';
import HttpErrorService from "../../services/http_error_service";
import prismaService from "../../services/prisma_service";
import ResponseService from "../../services/response_service";
import { ValidationError } from "../../utils/http/lancar_erro";
import validateSchema from '../../services/validade_schema';
import { createCategoria as createCategoriaSchema, updateCategoria as updateCategoriaSchema } from '../../schemas/financeiro/categoria_schema';
export const createcategoria = async (req: Request, res: Response) => {
  try {
    const validated = validateSchema(createCategoriaSchema, req.body);
    const received = await prismaService.financeiroCategorias.create({
      data: validated,
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
    const categorias = await prismaService.financeiroCategorias.findMany({
      where: { contaSistemaId: req.body.contaSistemaId },
    });
    ResponseService.success(res, { data: categorias });
  } catch (error: any) {
    HttpErrorService.hadle(error, res);
  }
};

export const getcategoria = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const categoria = await prismaService.financeiroCategorias.findUnique({
      where: { id: Number(id), contaSistemaId: req.body.contaSistemaId },
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
    const validated = validateSchema(updateCategoriaSchema, req.body);
    const received = await prismaService.financeiroCategorias.update({
      where: { id: Number(id), contaSistemaId: req.body.contaSistemaId },
      data: validated,
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
    await prismaService.financeiroCategorias.delete({ where: { id: Number(id), contaSistemaId: req.body.contaSistemaId } });
    ResponseService.success(res, { message: "Categoria excluida com sucesso" });
  } catch (error: any) {
    HttpErrorService.hadle(error, res);
  }
};
