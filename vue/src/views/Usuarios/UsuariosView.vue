<template>
  <div>
    <fwb-tabs v-model="activeTab" variant="underline">
      <fwb-tab name="first" title="Listagem">
        <div class="flex justify-between gap-2">
          <div>
            <FwbInput
              class="my-1"
              size="xs"
              type="text"
              placeholder="Nome, e-mail, telefone..."
            />
            
          </div>
          <div class="flex items-center gap-2">
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
                  class="dark:bg-emerald-800 dark:text-emerald-400 text-emerald-600 bg-emerald-100 p-2 rounded-md"
                >
                  #{{ usuario.id }}
                </span></fwb-table-cell
              >
              <fwb-table-cell><span class="bg-blue-900 text-blue-100 p-2 rounded-md">{{ usuario.nome }}</span></fwb-table-cell>
              <fwb-table-cell>{{ usuario.email }}</fwb-table-cell>
              <fwb-table-cell>{{
                usuario.telefone || "Não informado"
              }}</fwb-table-cell>
              <fwb-table-cell>{{ usuario.regra }}</fwb-table-cell>
              <fwb-table-cell class="flex justify-end gap-2">
                <fwb-a href="javascript:void(0)" class="dark:bg-red-900 bg-red-400 p-2 rounded-md dark:text-red-400 text-red-900"><iconFA icon="trash" /></fwb-a>
                <fwb-a href="javascript:void(0)" class="dark:bg-cyan-900 bg-cyan-400 p-2 rounded-md dark:text-cyan-400 text-cyan-900"><iconFA icon="pencil" /></fwb-a>
              </fwb-table-cell>
            </fwb-table-row>
          </fwb-table-body>
        </fwb-table>
        <fwb-pagination class="mt-2" v-model="currentPage" next-label="Proxima" previous-label="Anterior" :per-page="perPage" :total-items="totalItens"></fwb-pagination>
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
    FwbInput,
    FwbTableBody,
    FwbTableCell,
    FwbTableHead,
    FwbTableHeadCell,
    FwbTableRow,
    FwbTab,
    FwbTabs,
    FwbButton,
    FwbPagination,
    FwbSelect,
  } from "flowbite-vue";

  import { onMounted, ref } from "vue";

  const activeTab = ref("first");
  const usuarioStore = useUsuarioStore();
  const showModal = ref(false);

  const totalItens = ref(0);
  const perPage = ref(10);
  const currentPage = ref(1);

  onMounted(async () => {
    await usuarioStore.getUsuarios();
    totalItens.value = usuarioStore.usuarios.length;
  });
</script>
