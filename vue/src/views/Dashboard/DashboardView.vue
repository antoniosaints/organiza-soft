<template>
  <div class="mx-auto max-w-7xl">
    <TabsDashboardView>
      <template v-slot:title>
        <div class="text-left mb-2">
          <h2 class="text-2xl font-semibold">{{ saudacaoDinamica() }}, {{ nome }} 😉🎯</h2>
          <p class="text-sm text-muted-foreground">Acompanhe o desempenho da sua empresa aqui.</p>
        </div>
      </template>
      <template v-slot:general>
        <DashboardGeral />
      </template>
      <template v-slot:financeiro>
        <DashboardLancamentos :title-dashboard="false" />
      </template>
    </TabsDashboardView>
  </div>
</template>

<script setup lang="ts">
import TabsDashboardView from "./TabsDashboardView.vue";
import DashboardGeral from "./DashboardGeral.vue";
import { useLoginStore } from "@/stores/login/loginStore";
import DashboardLancamentos from "@/pages/Financeiro/Lancamentos/Dashboard/DashboardLancamentos.vue";

const loginStore = useLoginStore();
const nome = loginStore.dataUserLogged?.name.split(' ')[0] || "Usuário";
const saudacaoDinamica = () => {
  const horario = new Date().getHours();
  return (horario < 12) ? "Bom dia" : (horario < 18) ? "Boa tarde" : "Boa noite";
}
</script>