<template>
  <div class="mx-auto max-w-7xl">
    <TabsDashboardView>
      <template v-slot:title>
        <div class="text-center mb-2">
          <h2 class="text-2xl font-semibold">Bom dia, Antonio Costa 🎯</h2>
          <p class="text-sm text-muted-foreground">Acompanhe o desempenho do seu negócio aqui.</p>
        </div>
      </template>
      <template v-slot:general>
        <DashboardGeral />
      </template>
    </TabsDashboardView>
  </div>
</template>

<script setup lang="ts">
import TabsDashboardView from "./TabsDashboardView.vue";
import DashboardGeral from "./DashboardGeral.vue";
</script>