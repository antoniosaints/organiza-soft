import { RouteRecordRaw } from "vue-router";

export const crmRouter: RouteRecordRaw = {
  path: "/app/crm",
  name: "crm",
  redirect: "/app/crm/clientes",
  meta: { breadcrumb: 'CRM' },
  children: [
    {
      path: "/app/crm/clientes",
      name: "Clientes",
      meta: { breadcrumb: "Clientes" },
      component: () => import("@/views/Crm/Clientes/ClienteView.vue"),
    },
  ],
};
