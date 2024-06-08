<template>
  <div class="p-4">
    <div class="py-4 overflow-y-auto">
      <ul class="space-y-2 font-medium">
        <MenuLink icon="clock" label="Ponto" para="/" />
        <MenuLink v-if="useLoginStore().isAdmin" icon="location-dot" label="Locais de trabalho" para="/locais" />
        <MenuLink v-if="useLoginStore().isAdmin" icon="user" label="Usuários" para="/usuarios/lista" />
        <MenuLink icon="right-from-bracket" @click="useLoginStore().logout()" label="Sair" />
      </ul>
    </div>
    <hr>
    <div class="flex flex-col mt-4">
      <label class="inline-flex items-center mb-5 cursor-pointer" @change="toggleDarkMode">
        <input type="checkbox" v-model="darkMode" value="" class="sr-only peer" />
        <div
          class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 dark:peer-focus:ring-emerald-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:w-5 after:h-5 after:transition-all dark:border-gray-600 peer-checked:bg-emerald-600">
        </div>
        <span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">DarkMode</span>
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
