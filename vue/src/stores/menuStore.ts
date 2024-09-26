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
        permissions.admin = loginStore.isAdminUser,
        permissions.assistente = loginStore.isProAccount,
        permissions.crm = (loginStore.dataUserInfosLogged?.regra !== "visualizador" ),
        permissions.vendas= true,
        permissions.financeiro= true,
        permissions.patrimonio= true,
        permissions.servicos= true,
        permissions.assinantes=true
    }

    return { permissions, setConfigs };
});