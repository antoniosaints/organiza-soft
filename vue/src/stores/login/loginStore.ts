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
type TStatusAccount = "ativa" | "inativa" | "cancelada" | "vencida";
interface IAccountData {
    id: number,
    conta: string,
    email: string,
    slug: string,
    descricao: string,
    plano: "free" | "pro" | "admin",
    status: "ativa" | "inativa" | "cancelada" | "vencida",
    stripeCustomerId: string,
    stripeSubscriptionId: string | null,
    dataCriado: string,
    dataAtualizada: string
}

export const useLoginStore = defineStore("login", () => {
    const isAutenticated = ref(true);
    const isProAccount = ref(false);
    const isAdminUser = ref(false);
    const statusAccount = ref<TStatusAccount>('inativa');
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
            statusAccount.value = dataAccountLogged.value?.status || "inativa";
            isProAccount.value = response.plano == "pro" ? true : false
        }catch (error: any) {
            console.log(error);
        }
    }

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