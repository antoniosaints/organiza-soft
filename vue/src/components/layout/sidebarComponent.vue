<template>
  <fwb-sidebar
    :class="mainStore.darkMode ? 'dark' : ''"
    class="w-64 hidden md:flex fixed top-0 z-40 left-0 h-screen flex-col bg-white dark:bg-gray-800"
  >
    <FwbSidebarLogo
      name="Organiza SOFT"
      class="dark:bg-gray-800 text-gray-900 bg-gray-50"
      logo="/logo-login.png"
      to="/dashboard"
    />
    <fwb-sidebar-item to="/dashboard">
      <template #icon>
        <IconFA
          icon="chart-pie"
          class="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
        />
      </template>
      <template #default>Dashboard</template>
    </fwb-sidebar-item>
    <fwb-sidebar-dropdown-item>
      <template #icon>
        <IconFA
          icon="cogs"
          class="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
        />
      </template>
      <template #trigger> Administração </template>
      <template #default>
        <fwb-sidebar-item class="pl-11" to="/administracao/usuarios">
          <template #icon>
            <IconFA
              icon="users"
              class="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
            />
          </template>
          Usuários
        </fwb-sidebar-item>
        <fwb-sidebar-item class="pl-11" to="/administracao/regras">
          <template #icon>
            <IconFA
              icon="layer-group"
              class="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
            />
          </template>
          Regras
        </fwb-sidebar-item>
      </template>
    </fwb-sidebar-dropdown-item>
    <fwb-sidebar-item style="margin-top: -4px" @click="logout" to="/login">
      <template #icon>
        <IconFA
          icon="right-from-bracket"
          class="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
        />
      </template>
      <template #default>Sair</template>
    </fwb-sidebar-item>
  </fwb-sidebar>
</template>
<script setup>
  import {
    FwbSidebar,
    FwbSidebarItem,
    FwbSidebarDropdownItem,
    FwbSidebarLogo,
  } from "flowbite-vue";
  import { useMainStore } from "../../stores/mainStore";
  import { LoginService } from "../../services/login/loginService";
  import StorageUtil from "../../utils/storageUtil";

  const mainStore = useMainStore();
  const logout = async () => {
    await LoginService.logout();
  };
</script>
