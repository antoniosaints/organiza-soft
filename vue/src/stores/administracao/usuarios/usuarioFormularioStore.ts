import IUsuario from "@/types/administracao/usuarios/IUsuario";
import { IUsuarioFormularioStore } from "@/types/administracao/usuarios/IUsuarioFormularioStore";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useUsuarioFormularioStore = defineStore("usuarioFormularioStore", (): IUsuarioFormularioStore => {
    const defaultData = ref<IUsuario>({
        nome: "",
        email: "",
        telefone: "",
        regra: "gerente",
        senha: "",
        status: "ativo",
        assistenteIa: false,
        rh: false,
        crm: false,
        vendas: false,
        financeiro: false,
        assinantes: false,
        dashboardCrm: false,
        dashboardFinanceiro: false,
        dashboardPatrimonio: false,
        dashboardVendas: false,
        servicos: true
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
