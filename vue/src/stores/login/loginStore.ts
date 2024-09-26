import axiosService from "@/services/http/axiosService";
import { IAccountData } from "@/types/contas/IAccountData";
import { IUserData } from "@/types/usuarios/IUserdata";
import IUsuario from "@/types/usuarios/IUsuario";
import StorageUtil from "@/utils/storageUtil";
import { defineStore } from "pinia";
import { ref } from "vue";

type TStatusAccount = "ativa" | "inativa" | "cancelada" | "vencida";

export const useLoginStore = defineStore("login", () => {
  const isAutenticated = ref(true);
  const isProAccount = ref(false);
  const isAdminUser = ref(false);
  const statusAccount = ref<TStatusAccount>("inativa");
  const dataUserLogged = ref<IUserData>();
  const dataUserInfosLogged = ref<IUsuario>();
  const dataAccountLogged = ref<IAccountData>();

  const getUserData = async () => {
    try {
      const { data: token } = await axiosService.get("auth/decode");
      const userId = token?.data?.userId;
      if (!userId)  throw new Error("Usuário não encontrado");
      const { data: user } = await axiosService.get(
        `/usuario/${token?.data?.userId}`
      );
      dataUserLogged.value = token.data;
      dataUserInfosLogged.value = user.data;
      isAdminUser.value = ["admin", "socio", "proprietario"].includes(
        user.data.regra
      );
    } catch (error: any) {
      console.log(error);
    }
  };
  const getAccountData = async () => {
    try {
      const idAccount = StorageUtil.get("@gestao_inteligente:contaId");
      if (!idAccount) throw new Error("Account ID not found");
      const { data: response } = await axiosService.get(
        `/contas-sistema/get-conta-sistema/${idAccount}`
      );
      dataAccountLogged.value = response;
      statusAccount.value = dataAccountLogged.value?.status || "inativa";
      isProAccount.value = response.plano == "pro";
    } catch (error: any) {
      console.log(error);
    }
  };

  return {
    isAutenticated,
    isProAccount,
    isAdminUser,
    statusAccount,
    dataUserLogged,
    dataUserInfosLogged,
    dataAccountLogged,
    getUserData,
    getAccountData,
  };
});
