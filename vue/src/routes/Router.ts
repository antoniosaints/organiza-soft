import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { useLoginStore } from "@/stores/login/loginStore";

const routes: RouteRecordRaw[] = [
    {
        path: "/app",
        name: "DefaultLayout",
        redirect: "/app/dashboard",
        meta: { requiresAuth: true, breadcrumb: 'Home' },
        component: () => import("@/layouts/shadcn/index.vue"),
        children: [
            {
                path: "/app/dashboard",
                name: "Dashboard",
                meta: { breadcrumb: 'Dashboard' },
                component: () => import("@/views/Dashboard/DashboardView.vue")
            },
            {
                path: "/app/assinatura",
                name: "Assinatura",
                meta: { breadcrumb: 'Assinatura' },
                component: () => import("@/views/Assinatura/AssinaturaView.vue")
            },
            {
                path: "/app/administracao",
                name: "Administracao",
                meta: { breadcrumb: 'Administracao' },
                redirect: "/app/administracao/usuarios",
                children: [
                    {
                        path: "/app/administracao/usuarios",
                        name: "Usuarios",
                        meta: { breadcrumb: 'Usuários' },
                        component: () => import("@/views/Administracao/Usuarios/UsuariosView.vue")
                    },
                    {
                        path: "/app/administracao/configuracoes",
                        name: "ConfiguracoesSistema",
                        meta: { breadcrumb: 'Configurações' },
                        component: () => import("@/views/Administracao/Configuracoes/ConfiguracoesView.vue")
                    },
                    {
                        path: "/app/administracao/logs",
                        name: "Logs",
                        meta: { breadcrumb: 'Logs do sistema' },
                        component: () => import("@/views/Administracao/LogSistema/LogsView.vue")
                    }
                ]
            },
            {
                path: "/app/crm",
                name: "crm",
                // meta: { breadcrumb: 'Administracao' },
                children: [
                    {
                        path: "/app/crm/clientes",
                        name: "Clientes",
                        meta: { breadcrumb: 'Clientes' },
                        component: () => import("@/views/Crm/Clientes/ClienteView.vue")
                    }
                ]
            },
            {
                path: "/app/vendas",
                name: "vendas",
                redirect: "/vendas/pdv",
                meta: { breadcrumb: 'Vendas' },
                children: [
                    {
                        path: "/app/vendas/pdv",
                        name: "PontoDeVenda",
                        meta: { breadcrumb: 'Ponto de vendas' },
                        component: () => import("@/views/Vendas/Pdv/PontoDeVendasView.vue")
                    }
                ]
            },
            {
                path: "/app/financeiro",
                name: "Financeiro",
                // meta: { breadcrumb: 'Financeiro' },
                children: [
                    {
                        path: "/app/financeiro/lancamentos",
                        name: "Lancamentos",
                        meta: { breadcrumb: 'Lançamentos financeiros' },
                        component: () => import("@/views/Financeiro/Lancamentos.vue")
                    }
                ]
            },
            {
                path: "/app/patrimonio",
                name: "Patrimonio",
                meta: { breadcrumb: 'Patrimônio' },
                redirect: "/app/patrimonio/produtos",
                children: [
                    {
                        path: "/app/patrimonio/produtos",
                        name: "Produtos",
                        meta: { breadcrumb: 'Produtos' },
                        component: () => import("@/views/Patrimonio/ProdutosView.vue")
                    },
                    {
                        path: "/app/patrimonio/fornecedores",
                        name: "Fornecedores",
                        meta: { breadcrumb: 'Fornecedores' },
                        component: () => import("@/views/Patrimonio/FornecedoresView.vue")
                    }
                ]
            },
            {
                path: "/app/perfil",
                name: "Perfil",
                meta: { breadcrumb: 'Perfil' },
                component: () => import("@/views/Perfil/InformacoesView.vue")
            },
            {
                path: "/app/agentesia",
                redirect: "/app/agentesia/playground",
                name: "AgenteDeIa",
                meta: { breadcrumb: 'Assistente de IA' },
                children: [
                    {
                        path: "/app/agentesia/playground",
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