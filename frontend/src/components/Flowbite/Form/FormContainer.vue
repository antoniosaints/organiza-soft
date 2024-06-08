<template>
  <form ref="formulario" @submit.prevent="SendForm" class="max-w-auto mx-auto gap-3">
    <slot></slot>
    <button class="bg-emerald-700 mt-4 w-auto hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded-lg"
      type="submit">Enviar</button>
    <button class="bg-amber-700 ml-3 mt-4 w-auto hover:bg-amber-700 text-white font-bold py-2 px-4 rounded-lg"
      type="button" @click="resetForm">Resetar</button>
  </form>
</template>

<script setup>
import { ref } from 'vue';

const emit = defineEmits(["submit", "resetForm"]);
const formulario = ref(null);
const resetForm = () => {
  emit("resetForm");
}
const SendForm = () => {
  emit("submit");
};
</script>
