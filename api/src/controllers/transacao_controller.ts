import { deleteFileService, renameFileService } from "../services/file_service";
import { Request, Response } from 'express';
import HttpErrorService from "../services/http_error_service";
import prismaService from "../services/prisma_service";
import ResponseService from "../services/response_service";
import uploadService from "../services/upload_service";
import { createTransacao as createTransacaoSchema, updateTransacao as updateTransacaoSchema } from "../schemas/transacao_schema";
import validateSchema from "../services/validade_schema";

// Criação de transação
export const createTransacao = async (req: Request, res: Response) => {
  try {
    const validated = validateSchema(createTransacaoSchema, req.body)

    const transacao = await prismaService.transacao.create({
      data: validated,
    });

    ResponseService.created(res, {
      message: "Transação criada com sucesso",
      data: transacao,
    }, "Transação criada com sucesso");
  } catch (error: any) {
    HttpErrorService.hadle(error, res);
  }
};

// Obter todas as transações
export const getTransacoes = async (req: Request, res: Response) => {
  try {
    const transacoes = await prismaService.transacao.findMany({
      where: {
        contaSistemaId: req.body.contaSistemaId
      }
    });
    ResponseService.success(res, { data: transacoes });
  } catch (error: any) {
    HttpErrorService.hadle(error, res);
  }
};

// Obter transação por ID
export const getTransacao = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const transacao = await prismaService.transacao.findUnique({
      where: { id: Number(id), contaSistemaId: req.body.contaSistemaId },
    });
    ResponseService.success(res, { data: transacao });
  } catch (error: any) {
    HttpErrorService.hadle(error, res);
  }
};

// Atualizar transação
export const updateTransacao = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const validated = validateSchema(updateTransacaoSchema, req.body)
    const transacao = await prismaService.transacao.update({
      where: { id: Number(id), contaSistemaId: req.body.contaSistemaId },
      data: validated
    });

    ResponseService.success(res, {
      message: "Transação atualizada com sucesso",
      data: transacao,
    }, "Transação atualizada com sucesso");
  } catch (error: any) {
    HttpErrorService.hadle(error, res);
  }
};

// Upload de comprovante
export const uploadComprovante = async (req: Request, res: Response) => {
  const upload = uploadService("comprovante", "tsc01");

  upload(req, res, (err: any) => {
    if (err) {
      return ResponseService.notFound(res, err.message);
    }

    if (!req.files || !Array.isArray(req.files)) {
      return ResponseService.notFound(res, "Nenhum arquivo foi enviado");
    }

    const files = req.files as Express.Multer.File[]; // Tipagem correta para req.files

    ResponseService.success(res, {
      message: "Comprovante enviado com sucesso",
      data: files.map((file) => file.filename), // Usando map com a tipagem correta
    }, "Comprovante enviado com sucesso");
  });
};

// Excluir comprovante
export const deleteComprovante = async (req: Request, res: Response) => {
  try {
    const fileName = req.params.filename;
    deleteFileService(fileName, (err: any) => {
      if (err) {
        return ResponseService.notFound(res, "Erro ao excluir o comprovante");
      }

      ResponseService.success(res, {
        message: "Comprovante excluído com sucesso",
      }, "Comprovante excluído com sucesso");
    });
  } catch (error: any) {
    HttpErrorService.hadle(error, res);
  }
};

// Renomear comprovante
export const renameComprovante = async (req: Request, res: Response) => {
  try {
    const oldName = req.params.filename;
    const { newName } = req.body;
    renameFileService(oldName, newName, (err: any) => {
      if (err) {
        return ResponseService.notFound(res, "Erro ao renomear o comprovante");
      }

      ResponseService.success(res, {
        message: "Comprovante renomeado com sucesso",
      }, "Comprovante renomeado com sucesso");
    });
  } catch (error: any) {
    HttpErrorService.hadle(error, res);
  }
};

// Excluir transação
export const deleteTransacao = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prismaService.transacao.delete({ where: { id: Number(id), contaSistemaId: req.body.contaSistemaId } });
    ResponseService.success(res, { message: "Transação excluída com sucesso" });
  } catch (error: any) {
    HttpErrorService.hadle(error, res);
  }
};
