import { Autorize } from "@/autorization";
import LancamentosRepository from "@/repositories/financeiro/lancamentosRepository";
import { ISchemaLancamento } from "@/stores/financeiro/lancamentos/lancamentoSchemaStore";
import { useLancamentosFormularioStore } from "@/stores/financeiro/lancamentos/lancamentosFormularioStore";
import { useLancamentosStore } from "@/stores/financeiro/lancamentos/lancamentoStore";
import { ScToastUtil } from "@/utils/scToastUtil";

export class LancamentoService {
  static async create(lancamento: ISchemaLancamento): Promise<void | boolean> {
    try {
      if (!Autorize.can("criar", "lancamentos")) return;
      await LancamentosRepository.create(lancamento);
      ScToastUtil.success("Lançamento criado com sucesso");
      useLancamentosFormularioStore().isModalDetalhesOpen = false;
      useLancamentosStore().getLancamentos();
      return true;
    } catch (error: any) {
        console.log(error);
      ScToastUtil.warning("Erro ao criar o lançamento: " + error.response.data.message || "erro interno");
      return false;
    }
  }
}
