import CookieUtil from "@/utils/cookie";
import { useMainStore } from "@/stores/main";
import router from "@/routes/Router";
import HttpAxios from "./axios";
import toast from "@/utils/toast";

export default class LoginService {
    static async Login(usuario, lembrar) {
        try {
            const { data } = await HttpAxios.post("auth", usuario);
            console.log(data)
            CookieUtil.setCookie("@gestao_inteligente:token", data.token, 1);
            CookieUtil.setCookie(
                "@gestao_inteligente:refreshtoken",
                data.refreshToken,
                7
            );
            useMainStore().isAuth = true;
            // await useAutorizacaoStore().getPermissoesUsuario();
            this.LembrarLogin(lembrar, usuario);
            toast.success(data.message, 'Logado!');
            router.push({ path: "/" });
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message, 'Ops..');
            return false;
        }
    }

    static LembrarLogin(bool, user) {
        if (bool) {
            localStorage.setItem("rememberMe", true);
            localStorage.setItem("@gestao_inteligente:email", user.email)
            localStorage.setItem("@gestao_inteligente:password", user.password)
        } else {
            localStorage.removeItem("rememberMe");
            localStorage.removeItem("@gestao_inteligente:email");
            localStorage.removeItem("@gestao_inteligente:password");
        }
    }

    static async Logout() {
        CookieUtil.deleteCookie("@gestao_inteligente:token");
        CookieUtil.deleteCookie("@gestao_inteligente:refreshtoken");
        useMainStore().isAuth = false;
        router.push({ path: "/login" });
    }
}