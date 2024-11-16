import { useLoginStore } from "@/stores/login/loginStore";
import IContaTransacao from "@/types/financeiro/IContaTransacao";
import { defineStore } from "pinia";
import { ref } from "vue";
const loginStore = useLoginStore();

export const useContaLancamentoFormularioStore = defineStore(
  "ContaLancamentoFormularioStore",
  () => {
    const defaultData = ref<IContaTransacao>({
      conta: "",
      cor: "",
      userId: loginStore.dataUserInfosLogged?.id!,
    });

    const data = ref<IContaTransacao>({ ...defaultData.value });
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
