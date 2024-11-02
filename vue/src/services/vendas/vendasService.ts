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

  static async generatePix(id: number): Promise<string | undefined> {
    if (!Autorize.can("criar_pix", "vendas")) return;
    try {
      return await VendasRepository.getPix(id);
    } catch (error: any) {
      ScToastUtil.warning("Erro ao gerar pix: " + error.response.data.message || "erro interno");
      return "";
    }
  }

  static async generateCheckout(id: number): Promise<string | undefined> {
    if (!Autorize.can("criar_checkout", "vendas")) return;
    try {
      return await VendasRepository.getCheckout(id);
    } catch (error: any) {
      ScToastUtil.warning("Erro ao gerar checkout: " + error.response.data.message || "erro interno");
      return "";
    }
  }
}
