import ICliente from "@/types/administracao/clientes/ICliente";
import { IClienteFormularioStore } from "@/types/administracao/clientes/IClienteFormularioStore";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useClienteFormularioStore = defineStore("usuarioFormularioStore", (): IClienteFormularioStore => {
    const defaultData = ref<ICliente>({
        nome: "",
        email: "",
        telefone: "",
        endereco: "",
        status: "ativo"
    });

    const data = ref<ICliente>({ ...defaultData.value });
    const refId = ref<number | null>(null);
    const isModalOpen = ref(false);

    const resetData = () => {
        data.value = { ...defaultData.value };
    };

    return {
        data,
        defaultData,
        refId,
        isModalOpen,
        resetData
    };
});
