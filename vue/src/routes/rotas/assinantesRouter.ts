import { RouteRecordRaw } from "vue-router";

export const assinantesRouter: RouteRecordRaw = {
  path: "/app/assinantes",
  name: "Assinantes",
  meta: { breadcrumb: "Assinantes" },
  redirect: "/app/Assinantes",
  children: [
    {
      path: "/app/Assinantes/Painel",
      name: "AssinantesPainelView",
      meta: { breadcrumb: "Painel de assinaturas" },
      component: () =>
        import("@/views/Assinantes/PainelView.vue"),
    },
    {
      path: "/app/Assinantes/contratos",
      name: "AssinantesView",
      meta: { breadcrumb: "Assinantes" },
      component: () =>
        import("@/views/Assinantes/AssinaturasView.vue"),
    },
    {
      path: "/app/Assinantes/planos",
      name: "PlanosAssinaturasView",
      meta: { breadcrumb: "Planos" },
      component: () =>
        import("@/views/Assinantes/PlanosView.vue"),
    },
    {
      path: "/app/Assinantes/produtos",
      name: "ProdutosAssinaturasView",
      meta: { breadcrumb: "Produtos e Serviços" },
      component: () =>
        import("@/views/Assinantes/ProdutosView.vue"),
    },
  ],
};
