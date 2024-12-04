import { Autorize } from "@/autorization";
import LancamentosRepository from "@/repositories/financeiro/lancamentosRepository";
import {
  ISchemaLancamento,
  useLancamentoSchemaStore,
} from "@/stores/financeiro/lancamentos/lancamentoSchemaStore";
import { useLancamentosFormularioStore } from "@/stores/financeiro/lancamentos/lancamentosFormularioStore";
import { useLancamentosStore } from "@/stores/financeiro/lancamentos/lancamentoStore";
import ITransacao from "@/types/financeiro/ILancamentos";
import { ScToastUtil } from "@/utils/scToastUtil";

export class LancamentoService {
  static async create(lancamento: ISchemaLancamento): Promise<void | boolean> {
    try {
      if (!Autorize.can("criar", "lancamentos")) return;
      await LancamentosRepository.create(lancamento);
      ScToastUtil.success("Lançamento criado com sucesso");
      useLancamentosFormularioStore().isModalDetalhesOpen = false;
      useLancamentosStore().getLancamentos();
      useLancamentoSchemaStore().resetData();
      return true;
    } catch (error: any) {
      ScToastUtil.warning(
        "Erro ao criar o lançamento: " + error.response.data.message ||
          "erro interno"
      );
      return false;
    }
  }
  static async getAll(
    limit: string,
    page: number,
    search?: string,
    dateFilter?: string[]
  ): Promise<{ data: ITransacao[]; total: number }> {
    try {
      if (!Autorize.can("visualizar", "lancamentos")) return { data: [], total: 0 };
      const { data, total } = await LancamentosRepository.getAll(
        Number(limit),
        page,
        search,
        dateFilter
      );
      return {
        data,
        total,
      };
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message || "Erro desconhecido.";
      ScToastUtil.error(errorMessage);
      return {
        data: [],
        total: 0,
      };
    }
  }
}
