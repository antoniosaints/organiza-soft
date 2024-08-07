<template>
  <div
    :class="mainStore.darkMode ? 'dark' : ''"
    class="dark:bg-slate-900 min-h-screen"
  >
    <RouterView />
  </div>
</template>

<script setup lang="ts">
  import { useMainStore } from "./stores/mainStore";

  const mainStore = useMainStore();
</script>
