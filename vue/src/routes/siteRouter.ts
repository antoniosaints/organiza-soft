import { RouteRecordRaw } from "vue-router";

export const siteRouter: RouteRecordRaw = {
  path: "/",
  name: "LandingPage",
  component: () => import("@/views/LandingPage/LayoutView.vue"),
  children: [
    {
      path: "/",
      name: "HomePageSite",
      component: () => import("@/views/LandingPage/LandingView.vue"),
    },
    {
      path: "/cadastro",
      name: "CadastroNovaConta",
      component: () => import("@/views/LandingPage/CadastroView.vue"),
    },
    {
      path: "/termos",
      name: "TermosDeServico",
      component: () => import("@/views/LandingPage/TermosServicoView.vue"),
    },
    {
      path: "/politica",
      name: "PoliticaPrivacidade",
      component: () =>
        import("@/views/LandingPage/PoliticaPrivacidadeView.vue"),
    },
  ],
};
