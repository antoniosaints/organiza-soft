import { Request, Response } from "express";
import { updateTransacao as updateTransacaoSchema } from "../../schemas/financeiro/transacao_schema";
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
import {
  resumoByConta,
  resumoGraficos,
} from "../../hooks/financeiro/get_resumo_graficos";
import { NaturezaTransacao, StatusTransacao } from "@prisma/client";

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
    const { dataFiltro } = req.query;
    let startDate = null;
    let endDate = null;
    if (dataFiltro) {
      [startDate, endDate] = (dataFiltro as string).split(",");
    }
    const lancamentos = await prismaService.financeiroTransacao.findMany({
      where: {
        contaSistemaId: req.body.contaSistemaId,
      },
      include: {
        FinanceiroParcelamento: true,
        Categoria: true,
        Conta: true,
        ClienteOnLancamentos: true,
      },
    });

    const lancamentosFiltradosPorData =
      startDate && endDate
        ? lancamentos.filter((lancamento) => {
            const dataVencimento = new Date(lancamento.dataVencimento);
            const inicio = new Date(startDate as string);
            const fim = new Date(endDate as string);
            return dataVencimento >= inicio && dataVencimento <= fim;
          })
        : lancamentos;

    const ultimoslancamentos = await prismaService.financeiroTransacao.findMany(
      {
        orderBy: { dataLancamento: "desc" },
        take: 5,
        include: {
          FinanceiroParcelamento: true,
          ClienteOnLancamentos: {
            select: { Cliente: { select: { nome: true, email: true } } },
          },
        },
        where: { contaSistemaId: req.body.contaSistemaId },
      }
    );
    const resumo = getResumoTransacoes(lancamentosFiltradosPorData);
    const graficos = resumoGraficos(lancamentosFiltradosPorData);
    const resumoContas = resumoByConta(lancamentos);

    ResponseService.success(
      res,
      { resumo, graficos, ultimoslancamentos, resumoContas },
      "Transações recuperadas"
    );
  } catch (error: any) {
    HttpErrorService.hadle(error, res);
  }
};

export const efetivarTransacao = async (req: Request, res: Response) => {
  try {
    const { date, formaPagamento } = req.body;
    const transacao = await prismaService.financeiroTransacao.update({
      data: { status: "recebido", dataEfetivado: new Date(date).toISOString(), metodoPagamento: formaPagamento },
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
  }
};

export const efetivarParcela = async (req: Request, res: Response) => {
  try {
    const parcela = await prismaService.financeiroParcelamento.update({
      data: { status: "recebido" },
      where: {
        id: Number(req.params.id),
        contaSistemaId: req.body.contaSistemaId,
      },
    });

    ResponseService.created(
      res,
      {
        message: "Parcela efetivada com sucesso",
        data: parcela,
      },
      "Parcela efetivada com sucesso"
    );
  } catch (error: any) {
    HttpErrorService.hadle(error, res);
  }
};

export const estornarParcela = async (req: Request, res: Response) => {
  try {
    const parcela = await prismaService.financeiroParcelamento.update({
      data: { status: "pendente" },
      where: {
        id: Number(req.params.id),
        contaSistemaId: req.body.contaSistemaId,
      },
    });

    ResponseService.created(
      res,
      {
        message: "Parcela estornada com sucesso",
        data: parcela,
      },
      "Parcela estornada com sucesso"
    );
  } catch (error: any) {
    HttpErrorService.hadle(error, res);
  }
};
export const estornarLancamento = async (req: Request, res: Response) => {
  try {
    const lancamento = await prismaService.financeiroTransacao.update({
      data: { status: "pendente", metodoPagamento: null, dataEfetivado: null },
      where: {
        id: Number(req.params.id),
        contaSistemaId: req.body.contaSistemaId,
      },
    });

    ResponseService.created(
      res,
      {
        message: "Lancamento estornado com sucesso",
        data: lancamento,
      },
      "Lancamento estornado com sucesso"
    );
  } catch (error: any) {
    HttpErrorService.hadle(error, res);
  }
};
export const converterLancamento = async (req: Request, res: Response) => {
  try {
    const lancamento = await prismaService.financeiroTransacao.update({
      data: { natureza: req.query.natureza == "receita" ? "despesa" : "receita" },
      where: {
        id: Number(req.params.id),
        contaSistemaId: req.body.contaSistemaId,
      },
    });

    ResponseService.created(
      res,
      {
        message: "Lancamento convertido com sucesso",
        data: lancamento,
      },
      "Lancamento convertido com sucesso"
    );
  } catch (error: any) {
    HttpErrorService.hadle(error, res);
  }
};
export const cancelarParcela = async (req: Request, res: Response) => {
  try {
    const parcela = await prismaService.financeiroParcelamento.update({
      data: { status: "cancelada" },
      where: {
        id: Number(req.params.id),
        contaSistemaId: req.body.contaSistemaId,
      },
    });

    ResponseService.created(
      res,
      {
        message: "Parcela cancelada com sucesso",
        data: parcela,
      },
      "Parcela cancelada com sucesso"
    );
  } catch (error: any) {
    HttpErrorService.hadle(error, res);
  }
};

// Obter todas as transações
export const getTransacoes = async (req: Request, res: Response) => {
  try {
    const { limit, page, search, natureza, status, dataFiltro } = req.query;
    let startDate = null;
    let endDate = null;
    if (dataFiltro) {
      [startDate, endDate] = (dataFiltro as string).split(",");
    }
    const offset = (Number(page) - 1) * Number(limit);
    const busca = search as string;
    const tipoConta = natureza?.toString() == "todos" ? null : natureza;
    const statusConta = status?.toString() == "todos" ? null : status;
    
    const whereFilter = {
      AND: [
        tipoConta ? { natureza: tipoConta as NaturezaTransacao } : {},
        statusConta ? { status: statusConta as StatusTransacao } : {},
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
          ClienteOnLancamentos: {
            select: { Cliente: { select: { nome: true, email: true } } },
          },
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
  }
};

// Obter transação por ID
export const getTransacao = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const transacao = await prismaService.financeiroTransacao.findUnique({
      where: { id: Number(id), contaSistemaId: req.body.contaSistemaId },
      include: {
        FinanceiroParcelamento: true,
        Categoria: true,
        Conta: true,
        ClienteOnLancamentos: {
          select: { Cliente: { select: { nome: true, email: true } } },
        },
      },
    });
    ResponseService.success(res, { data: transacao });
  } catch (error: any) {
    HttpErrorService.hadle(error, res);
  }
};

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
  }
};
