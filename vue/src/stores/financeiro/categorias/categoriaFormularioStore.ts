import ICategoria from "@/types/financeiro/ICategoria";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useCategoriaFormularioStore = defineStore(
  "CategoriaFormularioStore",
  () => {
    const defaultData = ref<ICategoria>({
      categoria: "",
      cor: "",
    });

    const data = ref<ICategoria>({ ...defaultData.value });
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
