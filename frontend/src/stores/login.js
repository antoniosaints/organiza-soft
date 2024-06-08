import httpService from "@/services/http"
import { defineStore } from "pinia"
import { useMainStore } from "./main"
import router from "@/routes/Router"
import toast from "@/utils/toast"
import CookieUtil from "@/utils/cookie"
import { ref } from "vue"


export const useLoginStore = defineStore("login", () => {
    const isAdmin = ref(true)
    async function login($user) {
        try {
            const user = await httpService("auth", "POST", $user)
            if (user.token) {
                CookieUtil.setCookie("@autentik:token", user.token, 1)
                CookieUtil.setCookie("@autentik:refreshtoken", user.refreshtoken, 7)
                useMainStore().isAuth = true
                return { success: true, message: user.message }
            } else {
                return { success: false, message: user.message }
            }
        } catch (error) {
            return { success: false, message: error.message }
        }
    }

    async function logout() {
        CookieUtil.deleteCookie("@autentik:token")
        CookieUtil.deleteCookie("@autentik:refreshtoken")
        useMainStore().isAuth = false
        router.push({ path: "/login" })
    }

    const checkToken = async () => {
        try {
            useMainStore().darkMode = JSON.parse(localStorage.getItem("darkMode"));
            const token = CookieUtil.getCookie("@autentik:token");
            if (token) {
                const response = await httpService("auth/verify");
                response.status === 200 ? useMainStore().isAuth = true : useMainStore().isAuth = false;
                if (router.currentRoute.value.path === "/login") {
                    router.push({ path: "/" });
                }
            } else {
                useMainStore().isAuth = false;
                router.push({ path: "/login" });
            }
        } catch (error) {
            useMainStore().isAuth = false;
            router.push({ path: "/login" });
            toast.error(error.message, 'Ops..');
        }
    };

    return { login, logout, checkToken, isAdmin }
})