import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { siteRouter } from "./siteRouter";
import { mainRouter } from "./mainRouter";

const routes: RouteRecordRaw[] = [
    siteRouter,
    mainRouter,
    {
        path: "/login",
        name: "Login",
        component: () => import("@/views/LoginView.vue")
    },
    {
        path: "/:pathMatch(.*)*",
        name: "NotFound",
        component: () => import("@/views/Errors/PageNotFound.vue")
    },
    {
        path: "/pagamentos/mercadopago/status",
        name: "pagamentos.status",
        component: () => import("@/views/Financeiro/Mercadopago/StatusPagamento.vue")
    },
    {
        path: "/recuperacao",
        name: "recuperacao.senha",
        component: () => import("@/views/PaginasAbertas/RecuperarSenha.vue")
    },
];

export const Router = createRouter({
    linkActiveClass: 'bg-sidebar-hover text-gray-100',
    linkExactActiveClass: 'border-gray-700',
    scrollBehavior: () => ({ top: 0, behavior: 'smooth' }),
    history: createWebHistory(),
    routes
});
