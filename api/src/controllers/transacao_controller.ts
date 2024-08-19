import { deleteFileService, renameFileService } from "../services/file_service";
import HttpErrorService from "../services/http_error_service";
import prismaService from "../services/prisma_service";
import ResponseService from "../services/response_service";
import uploadService from "../services/upload_service";

export const createTransacao = async (req: any, res: any) => {
  try {
    const {
      clienteId,
      operacao,
      natureza,
      contaId,
      formaPagamentoId,
      planoId,
      servicoId,
      categoriasId,
      parcelado,
      parcelamentoId,
      valor,
      desconto,
      valorFinal,
      dataEfetivado,
      dataLancamento,
      status,
      descricao,
    } = req.body;
    const transacao = await prismaService.transacao.create({
      data: {
        clienteId,
        operacao,
        natureza,
        contaId,
        formaPagamentoId,
        planoId,
        servicoId,
        categoriasId,
        parcelado,
        parcelamentoId,
        valor,
        desconto,
        valorFinal,
        dataEfetivado,
        dataLancamento,
        status,
        descricao,
      },
    });
    ResponseService.created(res, {
      message: "Transação criada com sucesso",
      data: transacao,
    }, "Transação criada com sucesso");
  } catch (error: any) {
    HttpErrorService.hadle(error, res);
  }
};

export const getTransacoes = async (req: any, res: any) => {
  try {
    const transacoes = await prismaService.transacao.findMany();
    ResponseService.success(res, { data: transacoes });
  } catch (error: any) {
    HttpErrorService.hadle(error, res);
  }
};

export const getTransacao = async (req: any, res: any) => {
  const { id } = req.params;
  try {
    const transacao = await prismaService.transacao.findUnique({
      where: { id: Number(id) },
    });
    ResponseService.success(res, { data: transacao });
  } catch (error: any) {
    HttpErrorService.hadle(error, res);
  }
};

export const updateTransacao = async (req: any, res: any) => {
  try {
    const { id } = req.params;
    const {
      clienteId,
      operacao,
      natureza,
      contaId,
      formaPagamentoId,
      planoId,
      servicoId,
      categoriasId,
      parcelado,
      parcelamentoId,
      valor,
      desconto,
      valorFinal,
      dataEfetivado,
      status,
      descricao,
    } = req.body;

    const dataISO = new Date(dataEfetivado).toISOString();
    const transacao = await prismaService.transacao.update({
      where: { id: Number(id) },
      data: {
        clienteId,
        operacao,
        natureza,
        contaId,
        formaPagamentoId,
        planoId,
        servicoId,
        categoriasId,
        parcelado,
        parcelamentoId,
        valor,
        desconto,
        valorFinal,
        dataEfetivado: dataISO,
        status,
        descricao,
      },
    });
    ResponseService.success(res, {
      message: "Transação atualizada com sucesso",
      data: transacao,
    }, "Transação atualizada com sucesso");
  } catch (error: any) {
    HttpErrorService.hadle(error, res);
  }
};

export const uploadComprovante = async (req: any, res: any) => {
  const upload = uploadService("comprovante", "tsc01");

  upload(req, res, (err: any) => {
    if (err) {
      return ResponseService.notFound(res, "Comprovante não enviado");
    }

    ResponseService.success(res, {
      message: "Comprovante enviado com sucesso",
      data: req.files.map((file: any) => file.filename),
    }, "Comprovante enviado com sucesso");
  })

};

export const deleteComprovante = async (req: any, res: any) => {
  try {
    const fileName = req.params.filename;
    deleteFileService(fileName, (err: any) => {
      if (err) {
        return ResponseService.notFound(res, "Erro ao excluir o comprovante");
      }

      ResponseService.success(res, {
        message: "Comprovante excluído com sucesso",
      }, "Comprovante excluído com sucesso");
    })
  } catch (error: any) {
    HttpErrorService.hadle(error, res);
  }

};

export const renameComprovante = async (req: any, res: any) => {
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
    })
  } catch (error: any) {
    HttpErrorService.hadle(error, res);
  }
};

export const deleteTransacao = async (req: any, res: any) => {
  const { id } = req.params;
  try {
    await prismaService.transacao.delete({ where: { id: Number(id) } });
    ResponseService.success(res, { message: "Transação excluida com sucesso" });
  } catch (error: any) {
    HttpErrorService.hadle(error, res);
  }
};
