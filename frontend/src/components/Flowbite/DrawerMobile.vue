<template>
  <div
    class="fixed bottom-0 left-0 z-50 w-full h-16 bg-gray-100 border-t border-blue-500 dark:bg-gray-700 dark:border-gray-600"
  >
    <div class="h-full justify-center max-w-lg flex mx-auto font-medium">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
defineOptions({ name: "Barra de navegação mobile" });
</script>
