<script setup lang="ts">
import { Home } from 'lucide-vue-next'
import { Button } from "@/components/ui/button"
import { useColorMode } from '@vueuse/core';
const goHome = () => {
  window.history.back()
}
useColorMode();
</script>

<template>
  <div class="min-h-screen bg-background flex flex-col items-center justify-center px-4 text-center">
    <h1 class="text-8xl font-extrabold text-primary mb-4">404</h1>
    <h2 class="text-3xl font-semibold text-foreground mb-6">Página Não Encontrada</h2>
    <p class="text-muted-foreground mb-8 max-w-md">
      Ops! A página que você está procurando não existe ou foi movida, informe o suporte da OrganizaSoft para solucionar esse problema.
    </p>
    <Button @click="goHome" class="inline-flex items-center">
      <Home class="mr-2 h-4 w-4" />
      Voltar
    </Button>
  </div>
</template>
