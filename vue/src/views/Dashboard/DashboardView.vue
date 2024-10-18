<template>
  <div class="mx-auto max-w-7xl">
    <TabsDashboardView>
      <template v-slot:title>
        <div class="text-left mb-2">
          <h2 class="text-2xl font-semibold">{{ saudacaoDinamica() }}, {{loginStore.dataUserLogged?.name.split(' ')[0]}} 🎯</h2>
          <p class="text-sm text-muted-foreground">Acompanhe o desempenho da sua empresa aqui.</p>
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
import { useLoginStore } from "@/stores/login/loginStore";

const loginStore = useLoginStore();
const saudacaoDinamica = () => {
  const horario = new Date().getHours();

  if (horario < 12) {
    return "Bom dia";
  } else if (horario < 18) {
    return "Boa tarde";
  } else {
    return "Boa noite";
  }
}
</script>