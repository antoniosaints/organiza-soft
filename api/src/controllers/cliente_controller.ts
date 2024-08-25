import { Request, Response } from 'express';
import HttpErrorService from "../services/http_error_service";
import prismaService from "../services/prisma_service";
import ResponseService from "../services/response_service";

export const createCliente = async (req: Request, res: Response) => {
  const { nome, email, telefone, endereco } = req.body;
  try {
    const cliente = await prismaService.cliente.create({
      data: { nome, email, telefone, endereco },
    });
    ResponseService.created(res, {
      message: "Cliente criado com sucesso",
      data: cliente,
    });
  } catch (error: any) {
    HttpErrorService.hadle(error, res);
  }
};

export const getClientes = async (req: Request, res: Response) => {
  try {
    const clientes = await prismaService.cliente.findMany();
    ResponseService.success(res, { data: clientes });
  } catch (error: any) {
    HttpErrorService.hadle(error, res);
  }
};

export const getCliente = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    if (!id) throw new Error("ID obrigatorio");
    const cliente = await prismaService.cliente.findUnique({
      where: { id: Number(id) }
    });
    ResponseService.success(res, { data: cliente });
  } catch (error: any) {
    HttpErrorService.hadle(error, res);
  }
};

export const updateCliente = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { nome, email, telefone, endereco } = req.body;
  try {
    const cliente = await prismaService.cliente.update({
      where: { id: Number(id) },
      data: { nome, email, telefone, endereco },
    });
    ResponseService.success(res, {
      message: "Cliente atualizado com sucesso",
      data: cliente,
    });
  } catch (error: any) {
    HttpErrorService.hadle(error, res);
  }
};

export const deleteCliente = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const cliente = await prismaService.cliente.delete({
      where: { id: Number(id) },
    });
    ResponseService.success(res, {
      message: "Cliente deletado com sucesso",
      data: cliente,
    });
  } catch (error: any) {
    HttpErrorService.hadle(error, res);
  }
};
