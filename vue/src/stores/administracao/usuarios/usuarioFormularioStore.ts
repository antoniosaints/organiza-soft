import IUsuario from "@/types/usuarios/IUsuario";
import { IUsuarioFormularioStore } from "@/types/usuarios/IUsuarioFormularioStore";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useUsuarioFormularioStore = defineStore("usuarioFormularioStore", (): IUsuarioFormularioStore => {
    const defaultData = ref<IUsuario>({
        nome: "",
        email: "",
        grupoId: 1,
        telefone: "",
        regra: "gerente",
        senha: "",
        status: "ativo",
    });

    const data = ref<IUsuario>({ ...defaultData.value });
    const userId = ref<number | null>(null);
    const isModalOpen = ref(false);

    const resetData = () => {
        data.value = { ...defaultData.value };
    };

    return {
        data,
        defaultData,
        userId,
        isModalOpen,
        resetData
    };
});
