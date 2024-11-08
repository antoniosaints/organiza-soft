import { Autorize } from "@/autorization";
import LancamentosRepository from "@/repositories/financeiro/lancamentosRepository";
import { ISchemaLancamento } from "@/stores/financeiro/lancamentos/lancamentoSchemaStore";
import { ScToastUtil } from "@/utils/scToastUtil";

export class LancamentoService {
  static async create(lancamento: ISchemaLancamento): Promise<void | boolean> {
    try {
      if (!Autorize.can("criar", "lancamentos")) return;
      const returno = await LancamentosRepository.create(lancamento);
      console.log(returno);
      ScToastUtil.success("Lançamento criado com sucesso");
      return true;
    } catch (error: any) {
        console.log(error);
      ScToastUtil.warning("Erro ao criar o lançamento: " + error.response.data.message || "erro interno");
      return false;
    }
  }
}
