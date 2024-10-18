import { IPatrimonioProduto } from "@/types/patrimonio/IPatrimonioProduto";
import { IProdutoFormularioStore } from "@/types/patrimonio/IProdutoFormularioStore";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useProdutoFormularioStore = defineStore("patrimonioProdutoFormularioStore", (): IProdutoFormularioStore => {
    const defaultData = ref<IPatrimonioProduto>({
        produto: "",
        cor: "",
        preco: 0.0,
        sku: "",
        descricao: "",
    });

    const data = ref<IPatrimonioProduto>({ ...defaultData.value });
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
        isModalDetalhesOpen
    };
});
