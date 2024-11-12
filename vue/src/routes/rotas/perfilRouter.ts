import { RouteRecordRaw } from "vue-router";

export const perfilRouter: RouteRecordRaw = {
  path: "/app/perfil",
  name: "Perfil",
  meta: { breadcrumb: "Perfil" },
  component: () => import("@/views/Perfil/InformacoesView.vue"),
};
