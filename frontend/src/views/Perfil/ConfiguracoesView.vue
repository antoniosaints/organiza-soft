<template>
  <div class="p-4">
    <div class="py-4 overflow-y-auto">
      <ul class="space-y-2 font-medium">
        <MenuLink icon="clock" label="Dashboard" para="/" />
        <li>
          <button type="button"
            class="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
            aria-controls="dropdown-example" data-collapse-toggle="dropdown-example">
            <svg
              class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
              aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 21">
              <path
                d="M15 12a1 1 0 0 0 .962-.726l2-7A1 1 0 0 0 17 3H3.77L3.175.745A1 1 0 0 0 2.208 0H1a1 1 0 0 0 0 2h.438l.6 2.255v.019l2 7 .746 2.986A3 3 0 1 0 9 17a2.966 2.966 0 0 0-.184-1h2.368c-.118.32-.18.659-.184 1a3 3 0 1 0 3-3H6.78l-.5-2H15Z" />
            </svg>
            <span class="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">E-commerce</span>
            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="m1 1 4 4 4-4" />
            </svg>
          </button>
          <ul id="dropdown-example" class="hidden py-2 space-y-2">
            <MenuLink v-if="useLoginStore().isAdmin" icon="user" label="Usuários" para="/usuarios/lista" />
          </ul>
        </li>
        <MenuLink v-if="useLoginStore().isAdmin" icon="location-dot" label="Locais de trabalho" para="/locais" />
        <MenuLink icon="right-from-bracket" @click="useLoginStore().logout()" label="Sair" />
      </ul>
    </div>
    <hr>
    <div class="flex flex-col mt-4">
      <label class="inline-flex items-center mb-5 cursor-pointer" @change="toggleDarkMode">
        <input type="checkbox" v-model="darkMode" value="" class="sr-only peer" />
        <div
          class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:w-5 after:h-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600">
        </div>
        <span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Modo escuro</span>
      </label>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import MenuLink from "@/components/Flowbite/Menu/MenuLink.vue";
import { useMainStore } from "@/stores/main";
import { useLoginStore } from "@/stores/login";
const store = useMainStore();

const darkMode = ref(localStorage.getItem("darkMode"));
const emit = defineEmits(["toggleDarkMode", "darkMode"]);

const toggleDarkMode = () => {
  store.darkMode = !store.darkMode;
  emit("darkMode", darkMode.value);
  localStorage.setItem("darkMode", darkMode.value);
};
</script>
