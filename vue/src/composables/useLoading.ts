import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useLoadingStore = defineStore('loadingStore', () => {
  const isLoading = ref(false);
  function startLoading() {
    isLoading.value = true;
  }
  function stopLoading() {
    isLoading.value = false;
  }

  return { isLoading, startLoading, stopLoading };
});
