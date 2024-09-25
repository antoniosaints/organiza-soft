import { defineStore } from "pinia";
import { reactive } from "vue";
import { useLoginStore } from "./login/loginStore";
import { IMenuStore } from "@/types/interface/IMenuStore";
const loginStore = useLoginStore();

export const useMenuStore = defineStore("menuStore", () => {
    const permissions = reactive<IMenuStore>({
        admin: loginStore.isAdminUser,
        assistente: loginStore.isProAccount,
        crm: (loginStore.dataUserInfosLogged?.regra !== "visualizador" ),
        vendas: true,
        financeiro: true,
        patrimonio: true,
        servicos: true,
        assinantes: true
    });

    return { permissions };
});