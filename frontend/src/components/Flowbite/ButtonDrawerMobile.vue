<template>
  <router-link :to="to" type="button"
    class="inline-flex flex-col items-center justify-center px-5 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 group dark:border-gray-600">
    <slot></slot>
    <span class="text-sm text-gray-500 dark:text-gray-400 group-hover:text-emerald-600 dark:group-hover:text-emerald-500">{{
      nome }}</span>
  </router-link>
</template>

<script setup>
defineProps({
  to: String,
  nome: String
})
defineOptions({ name: "Botão da barra de navegação mobile" });
</script>