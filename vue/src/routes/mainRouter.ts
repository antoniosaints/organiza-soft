import { RouteRecordRaw } from "vue-router";
import { adminRouter } from "./rotas/adminRouter";
import { agenteRouter } from "./rotas/agenteRouter";
import { assinaturaRouter } from "./rotas/assinaturaRouter";
import { crmRouter } from "./rotas/crmRouter";
import { dashboardRouter } from "./rotas/dashboardRouter";
import { financeiroRouter } from "./rotas/financeiroRouter";
import { patrimonioRouter } from "./rotas/patrimonioRouter";
import { perfilRouter } from "./rotas/perfilRouter";
import { vendasRouter } from "./rotas/vendasRouter";

export const mainRouter: RouteRecordRaw = {
  path: "/app",
  name: "DefaultLayout",
  redirect: "/app/dashboard",
  meta: { requiresAuth: true, breadcrumb: "Home" },
  component: () => import("@/layouts/shadcn/index.vue"),
  children: [
    dashboardRouter,
    agenteRouter,
    assinaturaRouter,
    adminRouter,
    crmRouter,
    vendasRouter,
    financeiroRouter,
    patrimonioRouter,
    perfilRouter,
  ],
};
