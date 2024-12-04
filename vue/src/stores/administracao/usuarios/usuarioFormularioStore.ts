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
        assistenteIa: true,
        rh: true,
        crm: true,
        vendas: true,
        financeiro: true,
        assinantes: true,
        patrimonio: true,
        resetarSenha: true,
        pagamentosRetroativos: true,
        recebimentosRetroativos: true,
        lancamentosRetroativos: true,
        dashboardCrm: true,
        dashboardFinanceiro: true,
        dashboardPatrimonio: true,
        dashboardVendas: true,
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
