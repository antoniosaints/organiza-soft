import { RouteRecordRaw } from "vue-router";

export const patrimonioRouter: RouteRecordRaw = {
  path: "/app/patrimonio",
  name: "Patrimonio",
  meta: { breadcrumb: "Patrimônio" },
  redirect: "/app/patrimonio/produtos",
  children: [
    {
      path: "/app/patrimonio/produtos",
      name: "Produtos",
      meta: { breadcrumb: "Produtos" },
      component: () => import("@/views/Patrimonio/ProdutosView.vue"),
    },
    {
      path: "/app/patrimonio/fornecedores",
      name: "Fornecedores",
      meta: { breadcrumb: "Fornecedores" },
      component: () => import("@/views/Patrimonio/FornecedoresView.vue"),
    },
  ],
};
