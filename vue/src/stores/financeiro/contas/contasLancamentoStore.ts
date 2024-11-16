import { Autorize } from "@/autorization";
import ContasLancamentosRepository from "@/repositories/financeiro/contasLancamentosRepository";
import IContaTransacao from "@/types/financeiro/IContaTransacao";
import { ScToastUtil } from "@/utils/scToastUtil";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useContasLancamentoStore = defineStore(
  "ContasLancamentoStore",
  () => {
    const contas = ref<IContaTransacao[]>([]);
    const limit = ref<string>("10");
    const page = ref<number>(1);
    const total = ref<number>(0);
    const search = ref<string>("");
    const selectedItens = ref<number[]>([]);

    const getContas = async (): Promise<void> => {
      try {
        if (!Autorize.can("visualizar", "contas_lancamentos")) return;
        const { data, total: totalClientes } =
          await ContasLancamentosRepository.getAll(
            Number(limit.value),
            page.value,
            search.value
          );
          contas.value = data;
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
        if (!Autorize.can("deletar", "contas_lancamentos")) return;
        await Promise.all(
          selectedItens.value.map(async (id) => {
            await ContasLancamentosRepository.delete(id);
          })
        );
        page.value = 1;
        await getContas();
        selectedItens.value = [];
        ScToastUtil.success("Itens deletados com sucesso.");
      } catch (error: any) {
        const errorMessage =
          error?.response?.data?.message || "Erro desconhecido.";
        ScToastUtil.error(errorMessage);
      }
    };

    return {
      contas,
      limit,
      page,
      total,
      search,
      selectedItens,
      handleSelectItens,
      deleteSelectedItens,
      getContas,
    };
  }
);
