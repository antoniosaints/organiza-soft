<template>
  <span class="bg-emerald-800 text-emerald-400 p-2 rounded-lg"><slot /></span>
</template>

<script setup lang="ts">
  defineProps({
    variant: {
      type: String,
      default: "default",
      options: ["default"],
    },
  });
</script>
