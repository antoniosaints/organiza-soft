import { Request, Response } from "express";
import {
  createCliente as createClienteSchema,
  updateCliente as updateClienteSchema,
} from "../../schemas/administracao/cliente_schema";
import {
  HttpErrorService,
  prismaService,
  ResponseService,
  validateSchema,
} from "../../services";
export const createCliente = async (req: Request, res: Response) => {
  try {
    const validated = validateSchema(createClienteSchema, req.body);
    const cliente = await prismaService.cliente.create({
      data: validated,
    });
    ResponseService.created(res, {
      message: "Cliente criado com sucesso",
      data: cliente,
    });
  } catch (error: any) {
    HttpErrorService.hadle(error, res);
  } finally {
    await prismaService.$disconnect();
  }
};

export const getClientes = async (req: Request, res: Response) => {
  try {
    const { limit, page, search } = req.query;
    const offset = (Number(page) - 1) * Number(limit);
    const busca = (search as string);

    const [items, total] = await Promise.all([
      prismaService.cliente.findMany({
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
            { contaSistemaId: req.body.contaSistemaId },
          ],
        },
      }),
      prismaService.cliente.count({
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

export const getCliente = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    if (!id) throw new Error("ID obrigatorio");
    const cliente = await prismaService.cliente.findUnique({
      where: { id: Number(id), contaSistemaId: req.body.contaSistemaId },
    });
    ResponseService.success(res, { data: cliente });
  } catch (error: any) {
    HttpErrorService.hadle(error, res);
  } finally {
    await prismaService.$disconnect();
  }
};

export const updateCliente = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const validated = validateSchema(updateClienteSchema, req.body);
    const cliente = await prismaService.cliente.update({
      where: { id: Number(id), contaSistemaId: req.body.contaSistemaId },
      data: validated,
    });
    ResponseService.success(res, {
      message: "Cliente atualizado com sucesso",
      data: cliente,
    });
  } catch (error: any) {
    HttpErrorService.hadle(error, res);
  } finally {
    await prismaService.$disconnect();
  }
};

export const deleteCliente = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const cliente = await prismaService.cliente.delete({
      where: { id: Number(id), contaSistemaId: req.body.contaSistemaId },
    });
    ResponseService.success(res, {
      message: "Cliente deletado com sucesso",
      data: cliente,
    });
  } catch (error: any) {
    HttpErrorService.hadle(error, res);
  } finally {
    await prismaService.$disconnect();
  }
};
