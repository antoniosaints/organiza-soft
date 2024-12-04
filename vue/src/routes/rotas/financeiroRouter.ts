import { RouteRecordRaw } from "vue-router";

export const financeiroRouter: RouteRecordRaw = {
  path: "/app/financeiro",
  name: "Financeiro",
  redirect: "/app/financeiro/lancamentos",
  meta: { breadcrumb: "Financeiro" },
  children: [
    {
      path: "/app/financeiro/dashboard",
      name: "DashboardFinanceiro",
      meta: { breadcrumb: "Dashboard financeiro", permissao: true },
      component: () => import("@/views/Financeiro/DashboardLancamento.vue"),
    },
    {
      path: "/app/financeiro/lancamentos",
      name: "Lancamentos",
      meta: { breadcrumb: "Lançamentos financeiros" },
      component: () => import("@/views/Financeiro/Lancamentos.vue"),
    },
  ],
};
