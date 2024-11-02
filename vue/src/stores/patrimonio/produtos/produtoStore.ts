import { Autorize } from "@/autorization";
import { ProdutosRepository } from "@/repositories/patrimonio/produtos/produtosRepository";
import { IPatrimonioProduto } from "@/types/patrimonio/IPatrimonioProduto";
import { IProdutoStore } from "@/types/patrimonio/IProdutoStore";
import { ScToastUtil } from "@/utils/scToastUtil";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useProdutoStore = defineStore(
  "patrimonioProdutoStore",
  (): IProdutoStore => {
    const produtos = ref<IPatrimonioProduto[]>([]);
    const total = ref<number>(0);
    const limit = ref<string>("10");
    const page = ref<number>(1);
    const search = ref<string>("");
    const selectedItens = ref<number[]>([]);

    const getProdutos = async (): Promise<void> => {
      try {
        if (!Autorize.can("visualizar", "produtos")) return;
        const { data, total: totalClientes } = await ProdutosRepository.getAll(
          Number(limit.value),
          page.value,
          search.value
        );
        produtos.value = data;
        total.value = totalClientes;
      } catch (error: any) {
        const errorMessage =
          error?.response?.data?.message || "Erro desconhecido.";
        ScToastUtil.error(errorMessage);
      }
    };

    const handleSelectItens = (id: number) => {
      if (selectedItens.value.includes(id)) {
        selectedItens.value = selectedItens.value.filter((item) => item !== id);
      } else {
        selectedItens.value.push(id);
      }
    };

    const deleteSelectedItens = async () => {
      try {
        if (!Autorize.can("deletar", "produtos")) return;
        await Promise.all(
          selectedItens.value.map(async (id) => {
            await ProdutosRepository.delete(id);
          })
        );
        page.value = 1;
        await getProdutos();
        selectedItens.value = [];
        ScToastUtil.success("Itens deletados com sucesso.");
      } catch (error: any) {
        const errorMessage =
          error?.response?.data?.message || "Erro desconhecido.";
        ScToastUtil.error(errorMessage);
      }
    };

    return {
      getProdutos,
      produtos,
      total,
      limit,
      page,
      search,
      selectedItens,
      handleSelectItens,
      deleteSelectedItens,
    };
  }
);
