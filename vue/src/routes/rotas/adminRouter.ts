import { RouteRecordRaw } from "vue-router";

export const adminRouter: RouteRecordRaw = {
  path: "/app/administracao",
  name: "Administracao",
  meta: { breadcrumb: "Administracao" },
  redirect: "/app/administracao/usuarios",
  children: [
    {
      path: "/app/administracao/usuarios",
      name: "Usuarios",
      meta: { breadcrumb: "Usuários" },
      component: () =>
        import("@/views/Administracao/Usuarios/UsuariosView.vue"),
    },
    {
      path: "/app/administracao/configuracoes",
      name: "ConfiguracoesSistema",
      meta: { breadcrumb: "Configurações" },
      component: () =>
        import("@/views/Administracao/Configuracoes/ConfiguracoesView.vue"),
    },
    {
      path: "/app/administracao/logs",
      name: "Logs",
      meta: { breadcrumb: "Logs do sistema" },
      component: () => import("@/views/Administracao/LogSistema/LogsView.vue"),
    },
  ],
};
