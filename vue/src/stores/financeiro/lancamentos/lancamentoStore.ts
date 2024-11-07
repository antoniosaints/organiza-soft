import { Autorize } from "@/autorization";
import LancamentosRepository from "@/repositories/financeiro/lancamentosRepository";
import ITransacao from "@/types/financeiro/ILancamentos";
import { ILancamentosStore } from "@/types/financeiro/ILancamentoStore";
import { ScToastUtil } from "@/utils/scToastUtil";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useLancamentosStore = defineStore(
  "LancamentosStore",
  (): ILancamentosStore => {
    const lancamentos = ref<ITransacao[]>([]);
    const limit = ref<string>("10");
    const page = ref<number>(1);
    const total = ref<number>(0);
    const search = ref<string>("");
    const selectedItens = ref<number[]>([]);
    const startDate = ref<string>("");
    const endDate = ref<string>("");

    const getLancamentos = async (): Promise<void> => {
      try {
        if (!Autorize.can("visualizar", "lancamentos")) return;
        const { data, total: totalClientes } =
          await LancamentosRepository.getAll(
            Number(limit.value),
            page.value,
            search.value
          );
        lancamentos.value = data;
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
        if (!Autorize.can("deletar", "lancamentos")) return;
        await Promise.all(
          selectedItens.value.map(async (id) => {
            await LancamentosRepository.delete(id);
          })
        );
        page.value = 1;
        await getLancamentos();
        selectedItens.value = [];
        ScToastUtil.success("Itens deletados com sucesso.");
      } catch (error: any) {
        const errorMessage =
          error?.response?.data?.message || "Erro desconhecido.";
        ScToastUtil.error(errorMessage);
      }
    };

    return {
      startDate,
      endDate,
      lancamentos,
      limit,
      page,
      total,
      search,
      selectedItens,
      handleSelectItens,
      deleteSelectedItens,
      getLancamentos,
    };
  }
);
