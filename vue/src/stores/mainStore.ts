import { LoginService } from "@/services/login/loginService";
import { defineStore } from "pinia";
import { useMenuStore } from "./menuStore";

export const useMainStore = defineStore("mainStore", () => {
    const menuStore = useMenuStore();
    const init = async () => {
        await LoginService.verify();
        menuStore.setConfigs();
    };
    return { init };
});