import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { useLoginStore } from "@/stores/login/loginStore";

const routes: RouteRecordRaw[] = [
    {
        path: "/",
        name: "DefaultLayout",
        redirect: "/dashboard",
        meta: { requiresAuth: true, breadcrumb: 'Home' },
        component: () => import("@/layouts/shadcn/index.vue"),
        children: [
            {
                path: "/dashboard",
                name: "Dashboard",
                meta: { breadcrumb: 'Dashboard' },
                component: () => import("@/views/Dashboard/DashboardView.vue")
            },
            {
                path: "/assinatura",
                name: "Assinatura",
                meta: { breadcrumb: 'Assinatura' },
                component: () => import("@/views/Assinatura/AssinaturaView.vue")
            },
            {
                path: "/administracao",
                name: "Administracao",
                // meta: { breadcrumb: 'Administracao' },
                children: [
                    {
                        path: "/administracao/usuarios",
                        name: "Usuarios",
                        meta: { breadcrumb: 'Usuários' },
                        component: () => import("@/views/Administracao/Usuarios/UsuariosView.vue")
                    },
                    {
                        path: "/administracao/logs",
                        name: "Logs",
                        meta: { breadcrumb: 'Logs do sistema' },
                        component: () => import("@/views/Administracao/LogSistema/LogsView.vue")
                    }
                ]
            },
            {
                path: "/crm",
                name: "crm",
                // meta: { breadcrumb: 'Administracao' },
                children: [
                    {
                        path: "/crm/clientes",
                        name: "Clientes",
                        meta: { breadcrumb: 'Clientes' },
                        component: () => import("@/views/Crm/Clientes/ClienteView.vue")
                    }
                ]
            },
            {
                path: "/financeiro",
                name: "Financeiro",
                // meta: { breadcrumb: 'Administracao' },
                children: [
                    {
                        path: "/financeiro/lancamentos",
                        name: "Lancamentos",
                        meta: { breadcrumb: 'Lançamentos financeiros' },
                        component: () => import("@/views/Financeiro/Lancamentos.vue")
                    }
                ]
            },
            {
                path: "/patrimonio",
                name: "Patrimonio",
                meta: { breadcrumb: 'Patrimônio' },
                children: [
                    {
                        path: "/patrimonio/produtos",
                        name: "Produtos",
                        meta: { breadcrumb: 'Produtos' },
                        component: () => import("@/views/Patrimonio/ProdutosView.vue")
                    }
                ]
            },
            {
                path: "/perfil",
                name: "Perfil",
                meta: { breadcrumb: 'Perfil' },
                component: () => import("@/views/Perfil/InformacoesView.vue")
            },
            {
                path: "/agentesia",
                redirect: "/agentesia/playground",
                name: "AgenteDeIa",
                meta: { breadcrumb: 'Assistente de IA' },
                children: [
                    {
                        path: "/agentesia/playground",
                        name: "Playground",
                        meta: { breadcrumb: 'Playground' },
                        component: () => import("@/views/AgenteIA/PlaygroundView.vue")
                    }
                ]
            }
        ]
    },
    {
        path: "/login",
        name: "Login",
        component: () => import("@/views/LoginView.vue")
    },
    {
        path: "/site",
        name: "LandingPage",
        component: () => import("@/views/LandingPage/LayoutView.vue"),
        children: [
            {
                path: "/site",
                name: "HomePageSite",
                component: () => import("@/views/LandingPage/LandingView.vue"),
            },
            {
                path: "/site/cadastro",
                name: "CadastroNovaConta",
                component: () => import("@/views/LandingPage/CadastroView.vue"),
            },
            {
                path: "/site/termos",
                name: "TermosDeServico",
                component: () => import("@/views/LandingPage/TermosServicoView.vue"),
            },
            {
                path: "/site/politica",
                name: "PoliticaPrivacidade",
                component: () => import("@/views/LandingPage/PoliticaPrivacidadeView.vue"),
            },
        ]
    }
];

export const Router = createRouter({
    linkActiveClass: 'bg-sidebar-hover text-gray-100',
    linkExactActiveClass: 'border-gray-700',
    scrollBehavior: () => ({ top: 0, behavior: 'smooth' }),
    history: createWebHistory(),
    routes
});

Router.beforeEach(async (to, from, next) => {
    if (to.matched.some((record) => record.meta.requiresAuth)) {
        if (!localStorage.getItem("@gestao_inteligente:token")) {
            next({ name: "Login" });
        } else {
            if (from.name === "Login") {
                next();
            } else {
                const loginstore = useLoginStore();
                if (!loginstore.isAutenticated) {
                    next({ name: "Login" });
                } else {
                    next();
                }
            }
        }
    } else {
        next();
    }
});