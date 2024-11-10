import { Request, Response } from "express";
import {
  updateTransacao as updateTransacaoSchema,
} from "../../schemas/financeiro/transacao_schema";
import {
  deleteFileService,
  HttpErrorService,
  prismaService,
  renameFileService,
  ResponseService,
  uploadService,
  validateSchema,
} from "../../services";
import { LancamentoBodySchema } from "../../schemas/financeiro/lancamento_body_schema";
import { LancamentoService } from "../../services/lancamentos_service";
import { getResumoTransacoes } from "../../hooks/financeiro/get_resumo";
import { resumoGraficos } from "../../hooks/financeiro/get_resumo_graficos";

// Criação de transação
export const createTransacao = async (req: Request, res: Response) => {
  try {
    const validated = validateSchema(LancamentoBodySchema, req.body);
    const Lancamento = new LancamentoService(validated, res);
    await Lancamento.initialize();
    return await Lancamento.commitLancamento();
  } catch (error: any) {
    HttpErrorService.hadle(error, res);
  }
};

export const getResumoLancamentos = async (req: Request, res: Response) => {
  try {
    const data = await prismaService.financeiroTransacao.findMany({
      where: { contaSistemaId: req.body.contaSistemaId },
      include: { FinanceiroParcelamento: true, Categoria: true },
    });

    const resumo = getResumoTransacoes(data);
    const chart = resumoGraficos(data);

    ResponseService.success(
      res,
      {resumo, chart},
      "Transações recuperadas"
    );
  } catch (error: any) {
    HttpErrorService.hadle(error, res);
  }
};

export const efetivarTransacao = async (req: Request, res: Response) => {
  try {
    const transacao = await prismaService.financeiroTransacao.update({
      data: { status: "recebido" },
      where: {
        id: Number(req.params.id),
        contaSistemaId: req.body.contaSistemaId,
      },
    });

    ResponseService.created(
      res,
      {
        message: "Transação efetivada com sucesso",
        data: transacao,
      },
      "Transação efetivada com sucesso"
    );
  } catch (error: any) {
    HttpErrorService.hadle(error, res);
  } finally {
    await prismaService.$disconnect();
  }
};

// Obter todas as transações
export const getTransacoes = async (req: Request, res: Response) => {
  try {
    const { limit, page, search, dataFiltro } = req.query;
    let startDate = null;
    let endDate = null;
    if (dataFiltro) {
      [startDate, endDate] = (dataFiltro as string).split(",");
    }
    const offset = (Number(page) - 1) * Number(limit);
    const busca = search as string;

    const whereFilter = {
      AND: [
        busca
          ? {
              OR: [
                { descricao: { contains: busca } },
                { codigoLancamento: { contains: busca } },
                { codigoNfe: { contains: busca } },
                { codigo_servico: { contains: busca } },
                { moeda: { contains: busca } },
                { referenciaExterna: { contains: busca } },
                { metodoPagamento: { contains: busca } },
              ],
            }
          : {},
        startDate && endDate
          ? {
              dataVencimento: {
                ...(startDate
                  ? { gte: new Date(startDate as string).toISOString() }
                  : {}),
                ...(endDate
                  ? { lte: new Date(endDate as string).toISOString() }
                  : {}),
              },
            }
          : {},
        { contaSistemaId: req.body.contaSistemaId },
      ],
    };
    const [items, total] = await Promise.all([
      prismaService.financeiroTransacao.findMany({
        skip: offset || 0,
        take: Number(limit) || 10,
        orderBy: { dataLancamento: "desc" },
        include: {
          FinanceiroParcelamento: true,
          Categoria: { select: { categoria: true } },
        },
        where: whereFilter,
      }),

      prismaService.financeiroTransacao.count({
        where: whereFilter,
      }),
    ]);
    ResponseService.success(res, { data: items, total });
  } catch (error: any) {
    HttpErrorService.hadle(error, res);
  } finally {
    await prismaService.$disconnect();
  }
};

// Obter transação por ID
export const getTransacao = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const transacao = await prismaService.financeiroTransacao.findUnique({
      where: { id: Number(id), contaSistemaId: req.body.contaSistemaId },
    });
    ResponseService.success(res, { data: transacao });
  } catch (error: any) {
    HttpErrorService.hadle(error, res);
  } finally {
    await prismaService.$disconnect();
  }
};

// Atualizar transação
export const updateTransacao = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const validated = validateSchema(updateTransacaoSchema, req.body);
    const transacao = await prismaService.financeiroTransacao.update({
      where: { id: Number(id), contaSistemaId: req.body.contaSistemaId },
      data: validated,
    });

    ResponseService.success(
      res,
      {
        message: "Transação atualizada com sucesso",
        data: transacao,
      },
      "Transação atualizada com sucesso"
    );
  } catch (error: any) {
    HttpErrorService.hadle(error, res);
  } finally {
    await prismaService.$disconnect();
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

    ResponseService.success(
      res,
      {
        message: "Comprovante enviado com sucesso",
        data: files.map((file) => file.filename), // Usando map com a tipagem correta
      },
      "Comprovante enviado com sucesso"
    );
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

      ResponseService.success(
        res,
        {
          message: "Comprovante excluído com sucesso",
        },
        "Comprovante excluído com sucesso"
      );
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

      ResponseService.success(
        res,
        {
          message: "Comprovante renomeado com sucesso",
        },
        "Comprovante renomeado com sucesso"
      );
    });
  } catch (error: any) {
    HttpErrorService.hadle(error, res);
  }
};

// Excluir transação
export const deleteTransacao = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prismaService.financeiroTransacao.delete({
      where: { id: Number(id), contaSistemaId: req.body.contaSistemaId },
    });
    ResponseService.success(res, { message: "Transação excluída com sucesso" });
  } catch (error: any) {
    HttpErrorService.hadle(error, res);
  } finally {
    await prismaService.$disconnect();
  }
};
