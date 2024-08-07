import httpService from "@/services/http";
import { defineStore } from "pinia";
import { useMainStore } from "./main";
import { useAutorizacaoStore } from "./Permissoes/autorizacaoStore";
import router from "@/routes/Router";
import toast from "@/utils/toast";
import CookieUtil from "@/utils/cookie";
import { ref } from "vue";
import HttpAxios from "@/services/axios";

export const useLoginStore = defineStore("login", () => {
  const isAdmin = ref(true);
  async function login($user) {
    try {
      const user = await httpService("auth", "POST", $user);
      if (user.token) {
        CookieUtil.setCookie("@gestao_inteligente:token", user.token, 1);
        CookieUtil.setCookie(
          "@gestao_inteligente:refreshtoken",
          user.refreshToken,
          7
        );
        useMainStore().isAuth = true;
        await useAutorizacaoStore().getPermissoesUsuario();
        return { success: true, message: user.message };
      } else {
        return { success: false, message: user.message };
      }
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  async function logout() {
    CookieUtil.deleteCookie("@gestao_inteligente:token");
    CookieUtil.deleteCookie("@gestao_inteligente:refreshtoken");
    useMainStore().isAuth = false;
    router.push({ path: "/login" });
  }

  const checkToken = async () => {
    try {
      useMainStore().darkMode = JSON.parse(localStorage.getItem("darkMode"));
      const token = CookieUtil.getCookie("@gestao_inteligente:token");
      if (token) {
        const { data, status } = await HttpAxios.get("auth/verify");
        if (status === 200) {
          useMainStore().isAuth = true
          if (router.currentRoute.value.path === "/login") {
            router.push({ path: "/" });
          }
          // await useAutorizacaoStore().getPermissoesUsuario();
        } else {
          useMainStore().isAuth = false
        }
      } else {
        useMainStore().isAuth = false;
        router.push({ path: "/login" });
      }
    } catch (error) {
      console.log(error);
      useMainStore().isAuth = false;
      router.push({ path: "/login" });
      toast.error(error.message, "Ops..");
    }
  };

  return { login, logout, checkToken, isAdmin };
});
