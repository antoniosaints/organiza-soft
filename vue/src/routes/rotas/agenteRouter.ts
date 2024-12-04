import { RouteRecordRaw } from "vue-router";

export const agenteRouter: RouteRecordRaw = {
  path: "/app/agentesia",
  redirect: "/app/agentesia/playground",
  name: "AgenteDeIa",
  meta: { breadcrumb: "Assistente de IA" },
  children: [
    {
      path: "/app/agentesia/playground",
      name: "Playground",
      meta: { breadcrumb: "Playground" },
      component: () => import("@/views/AgenteIA/PlaygroundView.vue"),
    },
  ],
};
