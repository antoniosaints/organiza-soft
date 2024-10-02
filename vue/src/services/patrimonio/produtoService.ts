import { Autorize } from "@/autorization";
import { ProdutosRepository } from "@/repositories/patrimonio/produtos/produtosRepository";
import { IPatrimonioProduto } from "@/types/patrimonio/IPatrimonioProduto";
import { ScToastUtil } from "@/utils/scToastUtil";

export class ProdutoService {
  static async create(produto: IPatrimonioProduto): Promise<void | boolean> {
    try {
      if (!Autorize.can("criar", "produtos")) return;
      await ProdutosRepository.create(produto);
      ScToastUtil.success("Produto criado com sucesso");
      return true;
    } catch (error: any) {
      ScToastUtil.warning("Erro ao criar o produto: " + error.response.data.message || "erro interno");
      return false;
    }
  }
  static async update(id: number, produto: IPatrimonioProduto): Promise<void | boolean> {
    try {
      if (!Autorize.can("atualizar", "produtos")) return;
      await ProdutosRepository.update(id, produto);
      ScToastUtil.success("Produto atualizado com sucesso");
      return true;
    } catch (error: any) {
      ScToastUtil.warning("Erro ao atualizar o produto: " + error.response.data.message || "erro interno");
      return false;
    }
  }
}
