import { RouteRecordRaw } from "vue-router";

export const assinaturaRouter: RouteRecordRaw = {
  path: "/app/licenca",
  name: "Assinatura",
  meta: { breadcrumb: "Assinatura" },
  component: () => import("@/views/Assinatura/AssinaturaView.vue"),
};
