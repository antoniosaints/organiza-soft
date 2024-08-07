<template>
  <div>
    <fwb-tabs v-model="activeTab">
      <fwb-tab name="first" title="Listagem">
        <fwb-table class="mt-2">
          <fwb-table-head>
            <fwb-table-head-cell>#</fwb-table-head-cell>
            <fwb-table-head-cell>Nome</fwb-table-head-cell>
            <fwb-table-head-cell>E-mail</fwb-table-head-cell>
            <fwb-table-head-cell>Telefone</fwb-table-head-cell>
            <fwb-table-head-cell class="text-right">Regra</fwb-table-head-cell>
          </fwb-table-head>
          <fwb-table-body>
            <fwb-table-row
              v-for="usuario in usuarioStore.usuarios"
              :key="usuario.id"
            >
              <fwb-table-cell
                ><span
                  class="dark:bg-emerald-800 dark:text-emerald-400 text-emerald-600 bg-emerald-100 p-2 rounded-lg"
                  >#{{ usuario.id }}</span
                ></fwb-table-cell
              >
              <fwb-table-cell>{{ usuario.nome }}</fwb-table-cell>
              <fwb-table-cell>{{ usuario.email }}</fwb-table-cell>
              <fwb-table-cell>{{
                usuario.telefone || "Não informado"
              }}</fwb-table-cell>
              <fwb-table-cell>{{ usuario.regra }}</fwb-table-cell>
            </fwb-table-row>
          </fwb-table-body>
        </fwb-table>
      </fwb-tab>
      <fwb-tab name="second" title="Gráficos"> teste </fwb-tab>
      <fwb-tab name="third" title="Comparativos"> Algo aqui</fwb-tab>
    </fwb-tabs>
  </div>
</template>

<script setup>
  import { useUsuarioStore } from "@/stores/usuarios/usuarioStore";
  import {
    FwbA,
    FwbTable,
    FwbTableBody,
    FwbTableCell,
    FwbTableHead,
    FwbTableHeadCell,
    FwbTableRow,
    FwbTab,
    FwbTabs,
  } from "flowbite-vue";

  import { onMounted, ref } from "vue";

  const activeTab = ref("first");
  const usuarioStore = useUsuarioStore();

  onMounted(async () => {
    await usuarioStore.getUsuarios();
  });
</script>
