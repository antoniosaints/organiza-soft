import { Autorize } from "@/autorization";
import VendasRepository from "@/repositories/vendas/vendasRepository";
import { ICreateVenda } from "@/types/vendas/ICreateVenda";
import { ScToastUtil } from "@/utils/scToastUtil";

export class VendasService {
  static async create(order: ICreateVenda): Promise<void | boolean> {
    try {
      if (!Autorize.can("criar", "vendas")) return;
      await VendasRepository.create(order);
      ScToastUtil.success("Venda criada com sucesso!");
      return true;
    } catch (error: any) {
      ScToastUtil.warning("Erro ao criar a venda: " + error.response.data.message || "erro interno");
      return false;
    }
  }
}
