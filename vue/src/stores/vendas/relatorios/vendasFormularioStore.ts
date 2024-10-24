import { IVenda } from "@/types/vendas/IVenda";
import { IVendaFormularioStore } from "@/types/vendas/IVendaFormularioStore";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useVendasFormularioStore = defineStore(
  "vendasFormularioStore",
  (): IVendaFormularioStore => {
    const defaultData = ref<IVenda>({
      status: "pendente",
      valor: 0,
      metodoPagamento: "dinheiro",
    });

    const data = ref<IVenda>({ ...defaultData.value });
    const refId = ref<number | null>(null);
    const isModalOpen = ref(false);
    const isModalDetalhesOpen = ref(false);

    const resetData = () => {
      data.value = { ...defaultData.value };
    };

    return {
      data,
      defaultData,
      refId,
      isModalOpen,
      resetData,
      isModalDetalhesOpen,
    };
  }
);
