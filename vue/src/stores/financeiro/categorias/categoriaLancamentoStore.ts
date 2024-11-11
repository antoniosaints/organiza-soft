import { Autorize } from "@/autorization";
import CategoriasLancamentosRepository from "@/repositories/financeiro/categoriasLancamentosRepository";
import ICategoria from "@/types/financeiro/ICategoria";
import { ScToastUtil } from "@/utils/scToastUtil";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useCategoriasLancamentoStore = defineStore(
  "CategoriasLancamentoStore",
  () => {
    const categorias = ref<ICategoria[]>([]);
    const limit = ref<string>("10");
    const page = ref<number>(1);
    const total = ref<number>(0);
    const search = ref<string>("");
    const selectedItens = ref<number[]>([]);

    const getCategorias = async (): Promise<void> => {
      try {
        if (!Autorize.can("visualizar", "categorias_lancamentos")) return;
        const { data, total: totalClientes } =
          await CategoriasLancamentosRepository.getAll(
            Number(limit.value),
            page.value,
            search.value
          );
          categorias.value = data;
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
        if (!Autorize.can("deletar", "categorias_lancamentos")) return;
        await Promise.all(
          selectedItens.value.map(async (id) => {
            await CategoriasLancamentosRepository.delete(id);
          })
        );
        page.value = 1;
        await getCategorias();
        selectedItens.value = [];
        ScToastUtil.success("Itens deletados com sucesso.");
      } catch (error: any) {
        const errorMessage =
          error?.response?.data?.message || "Erro desconhecido.";
        ScToastUtil.error(errorMessage);
      }
    };

    return {
      categorias,
      limit,
      page,
      total,
      search,
      selectedItens,
      handleSelectItens,
      deleteSelectedItens,
      getCategorias,
    };
  }
);
