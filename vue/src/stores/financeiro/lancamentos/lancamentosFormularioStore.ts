import ITransacao from "@/types/financeiro/ILancamentos";
import { ILancamentosFormularioStore } from "@/types/financeiro/ILancamentosFormularioStore";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useLancamentosFormularioStore = defineStore(
  "lancamentosFormularioStore",
  (): ILancamentosFormularioStore => {
    const defaultData = ref<ITransacao>({
      status: "pendente",
      valor: 0,
      categoriasId: 0,
      contaId: 0,
      dataVencimento: new Date(),
      metodoPagamento: "dinheiro",
      natureza: "receita",
      operacao: "entrada"
    });

    const data = ref<ITransacao>({ ...defaultData.value });
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
