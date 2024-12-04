<script setup lang="ts">
import Toaster from '@/components/ui/toast/Toaster.vue'
</script>

<template>
  <div class="dark:bg-slate-900 min-h-screen">
    <Toaster class="z-50" />
    <RouterView />
  </div>
</template>
