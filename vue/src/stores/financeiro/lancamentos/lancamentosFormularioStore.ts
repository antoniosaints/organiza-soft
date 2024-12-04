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
      categoriaId: null,
      contaId: null,
      dataVencimento: new Date().toUTCString(),
      metodoPagamento: "dinheiro",
      natureza: "receita",
      operacao: "entrada",
      taxaCambio: 0,
      parcelado: "nao",
      codigoNfe: "",
      fornecedorId: 0,
      taxaDesconto: 0,
      taxaJuros: 0,
      referenciaExterna: "",
    });

    const data = ref<ITransacao>({ ...defaultData.value });
    const refId = ref<number | null>(null);
    const isModalOpen = ref(false);
    const isModalEfetivarOpen = ref(false);
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
      isModalEfetivarOpen,
      isModalDetalhesOpen,
    };
  }
);
