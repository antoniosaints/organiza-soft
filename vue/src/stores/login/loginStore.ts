import axiosService from "@/services/http/axiosService";
import { defineStore } from "pinia";
import { ref } from "vue";

interface IUserData {
    userId: number,
    name: string,
    grupoId: number,
    iat: number,
    exp: number
}

export const useLoginStore = defineStore("login", () => {
    const isAutenticated = ref(true);
    const dataUserLogged = ref<IUserData>();

    const getUserData = async () => {
        const { data: response } = await axiosService.get("auth/decode");
        dataUserLogged.value = response.data;
    }

    return {
        isAutenticated,
        dataUserLogged,
        getUserData
    };
});