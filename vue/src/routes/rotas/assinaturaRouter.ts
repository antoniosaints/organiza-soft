import { RouteRecordRaw } from "vue-router";

export const assinaturaRouter: RouteRecordRaw = {
  path: "/app/assinatura",
  name: "Assinatura",
  meta: { breadcrumb: "Assinatura" },
  component: () => import("@/views/Assinatura/AssinaturaView.vue"),
};
