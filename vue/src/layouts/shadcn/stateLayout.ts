import { defineStore } from "pinia";
import { ref } from "vue";

export const useLayoutStore = defineStore("stateLayout", () => {
    const isOnline = ref<boolean>(navigator.onLine);
    window.addEventListener("online", () => {
        isOnline.value = true;
    })

    window.addEventListener("offline", () => {
        isOnline.value = false;
    })
    return { isOnline };
});
