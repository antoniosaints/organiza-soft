import { defineStore } from "pinia";
import { ref } from "vue";

export const useLoginStore = defineStore("login", () => {
    const isAutenticated = ref(true);

    return {
        isAutenticated,
    };
});