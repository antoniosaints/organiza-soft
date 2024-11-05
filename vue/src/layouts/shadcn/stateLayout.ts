import { useAlertStore } from "@/stores/alertStore";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useLayoutStore = defineStore("stateLayout", () => {
    const isOnline = ref<boolean>(navigator.onLine);
    window.addEventListener("online", () => {
        isOnline.value = true;
        useAlertStore().showAlertGlobal("Online", "Conexão estabelecida com sucesso", ["bg-success"], 4000);
    })

    window.addEventListener("offline", () => {
        isOnline.value = false;
        useAlertStore().showAlertGlobal("Offline", "Voce esta offline, verifique sua conexão!", ["bg-error"], 4000);
    })
    return { isOnline };
});
