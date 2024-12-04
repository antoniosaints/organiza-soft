import { defineStore } from "pinia";
import { reactive } from "vue";
import { useLoginStore } from "./login/loginStore";
import { IMenuStore } from "@/types/interface/IMenuStore";

export const useMenuStore = defineStore("menuStore", () => {
  const loginStore = useLoginStore();

  const permissions = reactive<IMenuStore>({
    admin: false,
    assistente: false,
    crm: false,
    rh: false,
    vendas: false,
    financeiro: false,
    patrimonio: false,
    servicos: false,
    assinantes: false,
    dashboardFinanceiro: false,
    dashboardCrm: false,
    dashboardPatrimonio: false,
    dashboardVendas: false,
  });

  const setConfigs = () => {
    permissions.admin = loginStore.isAdminUser;
    const userData = loginStore.dataUserInfosLogged;
    const isNotWatcher = userData?.regra != "visualizador";
    const isProAccount = loginStore.isProAccount;
    permissions.assistente = isProAccount && userData?.assistenteIa!;
    permissions.crm = isNotWatcher && userData?.crm!;
    permissions.vendas = isNotWatcher && userData?.vendas!;
    permissions.financeiro = isNotWatcher && userData?.financeiro!;
    permissions.patrimonio = isNotWatcher && userData?.patrimonio!;
    permissions.servicos = isNotWatcher && userData?.servicos!;
    permissions.assinantes = isNotWatcher && userData?.assinantes!;
    permissions.rh = isNotWatcher && userData?.rh!;
    permissions.dashboardFinanceiro =
      isNotWatcher && isProAccount && userData?.dashboardFinanceiro!;
    permissions.dashboardCrm =
      isNotWatcher && isProAccount && userData?.dashboardCrm!;
    permissions.dashboardPatrimonio =
      isNotWatcher && isProAccount && userData?.dashboardPatrimonio!;
    permissions.dashboardVendas =
      isNotWatcher && isProAccount && userData?.dashboardVendas!;
  };

  return { permissions, setConfigs };
});
