import axiosService from "@/services/http/axiosService";
import IUsuario from "@/types/usuarios/IUsuario";
import StorageUtil from "@/utils/storageUtil";
import { defineStore } from "pinia";
import { ref } from "vue";

interface IUserData {
    userId: number,
    name: string,
    grupoId: number,
    iat: number,
    contaId: number,
    exp: number
}
interface IAccountData {
    id: number,
    conta: string,
    email: string,
    slug: string,
    descricao: string,
    plano: "free" | "pro" | "admin",
    status: "ativa" | "inativa",
    stripeCustomerId: string,
    stripeSubscriptionId: string | null,
    dataCriado: string,
    dataAtualizada: string
}

export const useLoginStore = defineStore("login", () => {
    const isAutenticated = ref(true);
    const isProAccount = ref(false);
    const isAdminUser = ref(false);
    const dataUserLogged = ref<IUserData>();
    const dataUserInfosLogged = ref<IUsuario>();
    const dataAccountLogged = ref<IAccountData>();

    const getUserData = async () => {
        try {
            const { data: token } = await axiosService.get("auth/decode");
            const { data: user } = await axiosService.get(`/usuario/${token?.data?.userId}`);
            dataUserLogged.value = token.data;
            dataUserInfosLogged.value = user.data;
            isAdminUser.value = (user.data.regra == "admin" || user.data.regra == "socio" || user.data.regra == "proprietario") ? true : false;
        }catch (error: any) {
            console.log(error);
        }
    }
    const getAccountData = async () => {
        try {
            const idAccount = StorageUtil.get("@gestao_inteligente:contaId");
            const { data: response } = await axiosService.get(`/contas-sistema/get-conta-sistema/${idAccount}`);
            dataAccountLogged.value = response;
            isProAccount.value = response.plano == "pro" ? true : false
        }catch (error: any) {
            console.log(error);
        }
    }

    return {
        isAutenticated,
        isProAccount,
        isAdminUser,
        dataUserLogged,
        dataUserInfosLogged,
        dataAccountLogged,
        getUserData,
        getAccountData,
    };
});