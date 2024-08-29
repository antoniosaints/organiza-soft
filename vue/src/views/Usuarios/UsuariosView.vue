<template>
  <div>
    <UsuariosTable :usersListagem="usersListagem" />
  </div>
</template>

<script setup lang="ts">
import UsuariosTable from '@/pages/Usuarios/UsuariosTable.vue';
import { useUsuarioStore } from '@/stores/usuarios/usuarioStore';
import IUsuario from '@/types/usuarios/IUsuario';
import { onMounted, ref } from 'vue';
const usuarioStore = useUsuarioStore();
const usersListagem = ref<IUsuario[] | null> ();

onMounted(async () => {
  usersListagem.value = await usuarioStore.getUsuarios();
});
</script>