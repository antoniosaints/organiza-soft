import { defineStore } from "pinia";
import { ref } from "vue";

export const useAlertStore = defineStore("alertStore", () => {
  const showGlobalAlert = ref(false);
  const titleGlobal = ref("");
  const messageGlobal = ref("");
  const style = ref<string[]>(["bg-secondary"]);

  const resetAlertGLobal = () => {
    titleGlobal.value = "";
    messageGlobal.value = "";
    showGlobalAlert.value = false;
    style.value = [];
  };

  const showAlertGlobal = (
    title: string,
    message: string,
    styles: string[],
    duration: number = 0
  ) => {
    titleGlobal.value = title;
    messageGlobal.value = message;
    showGlobalAlert.value = true;
    style.value = styles;

    if (duration > 0) {
      setTimeout(() => {
        resetAlertGLobal();
      }, duration);
    }
  };

  return {
    showGlobalAlert,
    titleGlobal,
    messageGlobal,
    style,
    showAlertGlobal,
    resetAlertGLobal,
  };
});
