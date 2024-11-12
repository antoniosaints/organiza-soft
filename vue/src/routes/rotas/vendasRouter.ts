import { RouteRecordRaw } from "vue-router";

export const vendasRouter: RouteRecordRaw = {
  path: "/app/vendas",
  name: "vendas",
  redirect: "/app/vendas/pdv",
  meta: { breadcrumb: "Vendas" },
  children: [
    {
      path: "/app/vendas/pdv",
      name: "PontoDeVenda",
      meta: { breadcrumb: "Ponto de vendas" },
      component: () => import("@/views/Vendas/Pdv/PontoDeVendasView.vue"),
    },
    {
      path: "/app/vendas/relatorio",
      name: "RelatoriosVendas",
      meta: { breadcrumb: "Relatorios de vendas" },
      component: () =>
        import("@/views/Vendas/Relatorios/VendasRelatoriosView.vue"),
    },
  ],
};
