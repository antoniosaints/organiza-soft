import { ContasRepository } from "@/repositories/contas/contasRepository";
import axiosService from "@/services/http/axiosService";
import { IContaSistema } from "@/types/administracao/contas/IContaSistema";
import { IUserData } from "@/types/administracao/usuarios/IUserdata";
import IUsuario from "@/types/administracao/usuarios/IUsuario";
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
  const dataAccountLogged = ref<IContaSistema>();

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
      const data = await ContasRepository.get(Number(idAccount));
      dataAccountLogged.value = data;
      statusAccount.value = dataAccountLogged.value?.status || "inativa";
      isProAccount.value = data.plano == "pro" || data.plano == "admin";
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
