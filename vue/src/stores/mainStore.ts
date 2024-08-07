import { defineStore } from "pinia";
import { ref } from "vue";
import StorageUtil from "../utils/storageUtil";

export const useMainStore = defineStore("mainStore", () => {
    const darkMode = ref(JSON.parse(StorageUtil.get("@gestao_inteligente:darkMode")) || false);

    const toggleDarkMode = () => {
        darkMode.value = !darkMode.value;
        StorageUtil.set("@gestao_inteligente:darkMode", darkMode.value);
    }

    return { darkMode, toggleDarkMode };
});