<template>
  <div :class="store.darkMode ? 'dark' : ''">
    <router-view></router-view>
  </div>
</template>

<script setup>
import { useMainStore } from "./stores/main.js";
const store = useMainStore();
</script>
