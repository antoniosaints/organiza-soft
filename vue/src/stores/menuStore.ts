import { defineStore } from "pinia";
import { reactive } from "vue";
import { useLoginStore } from "./login/loginStore";
import { IMenuStore } from "@/types/interface/IMenuStore";

export const useMenuStore = defineStore("menuStore", () => {
    const loginStore = useLoginStore();

    const permissions = reactive<IMenuStore>({
        admin: false,
        assistente: false,
        crm: true,
        vendas: true,
        financeiro: true,
        patrimonio: true,
        servicos: true,
        assinantes: true
    });

    const setConfigs = () => {
        const { isAdminUser, isProAccount, dataUserInfosLogged } = loginStore;
        const userRole = dataUserInfosLogged?.regra;

        permissions.admin = isAdminUser;
        permissions.assistente = isProAccount;
        permissions.crm = userRole !== "visualizador";
    };

    return { permissions, setConfigs };
});
