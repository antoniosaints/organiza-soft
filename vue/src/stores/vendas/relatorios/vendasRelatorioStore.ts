import { Autorize } from "@/autorization";
import VendasRepository from "@/repositories/vendas/vendasRepository";
import { IVenda } from "@/types/vendas/IVenda";
import { IVendaStore } from "@/types/vendas/IVendaStore";
import { ScToastUtil } from "@/utils/scToastUtil";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useVendasRelatorioStore = defineStore(
  "vendasRelatorioStore",
  (): IVendaStore => {
    const vendas = ref<IVenda[]>([]);
    const limit = ref<string>("10");
    const page = ref<number>(1);
    const total = ref<number>(0);
    const search = ref<string>("");
    const selectedItens = ref<number[]>([]);

    const getVendas = async (dateFilter?: string[]): Promise<void> => {
      try {
        if (!Autorize.can("visualizar", "vendas")) return;
        const { data, total: totalClientes } = await VendasRepository.getAll(
          Number(limit.value),
          page.value,
          search.value,
          dateFilter
        );
        vendas.value = data;
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
        if (!Autorize.can("deletar", "vendas")) return;
        await Promise.all(
          selectedItens.value.map(async (id) => {
            await VendasRepository.delete(id);
          })
        );
        page.value = 1;
        await getVendas();
        selectedItens.value = [];
        ScToastUtil.success("Itens deletados com sucesso.");
      } catch (error: any) {
        const errorMessage =
          error?.response?.data?.message || "Erro desconhecido.";
        ScToastUtil.error(errorMessage);
      }
    };

    return {
      vendas,
      limit,
      page,
      total,
      search,
      selectedItens,
      handleSelectItens,
      deleteSelectedItens,
      getVendas
    };
  }
);
