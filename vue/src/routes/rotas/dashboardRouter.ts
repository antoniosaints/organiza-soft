import { RouteRecordRaw } from "vue-router";

export const dashboardRouter: RouteRecordRaw = {
  path: "/app/dashboard",
  name: "Dashboard",
  meta: { breadcrumb: "Dashboard" },
  component: () => import("@/views/Dashboard/DashboardView.vue"),
};
