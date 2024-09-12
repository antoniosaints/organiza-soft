import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { useLoginStore } from "@/stores/login/loginStore";

const routes: Array<RouteRecordRaw> = [
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
                path: "/administracao",
                name: "Administracao",
                // meta: { breadcrumb: 'Administracao' },
                children: [
                    {
                        path: "/administracao/usuarios",
                        name: "Usuarios",
                        meta: { breadcrumb: 'Usuários' },
                        component: () => import("@/views/Usuarios/UsuariosView.vue")
                    }
                ]
            },
            {
                path: "/perfil",
                name: "Perfil",
                meta: { breadcrumb: 'Perfil' },
                component: () => import("@/views/Perfil/InformacoesView.vue")
            }
        ]
    },
    {
        path: "/login",
        name: "Login",
        component: () => import("@/views/LoginView.vue")
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