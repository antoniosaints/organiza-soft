<template>
  <div>
    <fwb-tabs v-model="activeTab" variant="underline">
      <fwb-tab name="first" title="Listagem">
        <div class="flex justify-end gap-2">
          <FwbButton
            class="my-2"
            @click="showModal = true"
            color="default"
            size="sm"
            pill
          >
            <iconFA icon="circle-plus" />
            Novo usuário
          </FwbButton>
          <FwbButton class="my-2" color="green" size="sm" pill>
            <iconFA icon="circle-plus" />
            Alteração em lote
          </FwbButton>
        </div>
        <fwb-table>
          <fwb-table-head>
            <fwb-table-head-cell>#</fwb-table-head-cell>
            <fwb-table-head-cell>Nome</fwb-table-head-cell>
            <fwb-table-head-cell>E-mail</fwb-table-head-cell>
            <fwb-table-head-cell>Telefone</fwb-table-head-cell>
            <fwb-table-head-cell>Regra</fwb-table-head-cell>
            <fwb-table-head-cell class="text-right">Açoes</fwb-table-head-cell>
          </fwb-table-head>
          <fwb-table-body>
            <fwb-table-row
              v-for="usuario in usuarioStore.usuarios"
              :key="usuario.id"
            >
              <fwb-table-cell
                ><span
                  class="dark:bg-emerald-800 dark:text-emerald-400 text-emerald-600 bg-emerald-100 p-2 rounded-lg"
                >
                  #{{ usuario.id }}
                </span></fwb-table-cell
              >
              <fwb-table-cell>{{ usuario.nome }}</fwb-table-cell>
              <fwb-table-cell>{{ usuario.email }}</fwb-table-cell>
              <fwb-table-cell>{{
                usuario.telefone || "Não informado"
              }}</fwb-table-cell>
              <fwb-table-cell>{{ usuario.regra }}</fwb-table-cell>
              <fwb-table-cell>
                <fwb-a href="#"> Edit </fwb-a>
              </fwb-table-cell>
            </fwb-table-row>
          </fwb-table-body>
        </fwb-table>
      </fwb-tab>
      <fwb-tab name="second" title="Gráficos"> Gráficos aqui</fwb-tab>
      <fwb-tab name="third" title="Comparativos"> Algo aqui</fwb-tab>
    </fwb-tabs>
    <ModalUsuarios v-model:show-modal="showModal" />
  </div>
</template>

<script setup>
  import { useUsuarioStore } from "@/stores/usuarios/usuarioStore";
  import ModalUsuarios from "@/views/Usuarios/ModalUsuarios.vue";
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
    FwbButton,
  } from "flowbite-vue";

  import { onMounted, ref } from "vue";

  const activeTab = ref("first");
  const usuarioStore = useUsuarioStore();
  const showModal = ref(false);

  onMounted(async () => {
    await usuarioStore.getUsuarios();
  });
</script>
