<template>
  <div>
    <UsuariosTable :usersListagem="usuarioStore.usuarios" />
  </div>
</template>

<script setup lang="ts">
import UsuariosTable from '@/pages/Usuarios/UsuariosTable.vue';
import { useUsuarioStore } from '@/stores/usuarios/usuarioStore';
import { onMounted } from 'vue';

const usuarioStore = useUsuarioStore();

onMounted(async () => {
  await usuarioStore.getUsuarios();
});
</script>