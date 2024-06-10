<template>
  <div class="p-4">
    <!-- Breadcrumb -->
    <nav
      class="flex px-5 py-3 mb-4 text-gray-700 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700"
      aria-label="Breadcrumb">
      <ol class="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
        <li class="inline-flex items-center">
          <a href="#"
            class="inline-flex items-center text-sm font-medium text-gray-500 hover:text-emerald-600 dark:text-gray-400 dark:hover:text-white">
            <svg class="w-3 h-3 me-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
              viewBox="0 0 20 20">
              <path
                d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
            </svg>
            Autenticação
          </a>
        </li>
        <li>
          <div class="flex items-center">
            <svg class="rtl:rotate-180 block w-3 h-3 mx-1 text-gray-400" aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="m1 9 4-4-4-4" />
            </svg>
            <a href="#"
              class="ms-1 text-sm font-medium text-gray-900 hover:text-emerald-600 md:ms-2 dark:text-gray-400 dark:hover:text-white">Últimos acessos</a>
          </div>
        </li>
      </ol>
    </nav>

    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
      <TableComponent>
        <TheadComponent>
          <tr>
            <ThComponent> Usuário </ThComponent>
            <ThComponent> Senha(Criptografada) </ThComponent>
            <ThComponent> Resposta </ThComponent>
            <ThComponent> Data e Hora (Servidor) </ThComponent>
          </tr>
        </TheadComponent>
        <tbody>
          <tr v-for="conecction in connections" :key="conecction.id">
            <td class="px-6 py-4 font-bold text-md">
              <span class="inline-flex items-center justify-center p-1 px-2 text-sm font-medium text-green-800 bg-green-100 rounded-md dark:bg-green-900 dark:text-green-300">
                {{ conecction.username }}
              </span>
            </td>
            <td class="px-6 py-4 font-bold text-md">
              {{ conecction.pass }}
            </td>
            <td class="px-6 py-4 font-bold text-md">
              <span v-if="conecction.reply == 'Access-Accept'" class="inline-flex items-center justify-center p-1 px-2 text-sm font-medium text-blue-800 bg-blue-100 rounded-md dark:bg-blue-900 dark:text-blue-300">
                Permitido
              </span>
              <span v-else class="inline-flex items-center justify-center p-1 px-2 text-sm font-medium text-red-800 bg-red-100 rounded-md dark:bg-red-900 dark:text-red-300">
                Negado
              </span>
            </td>
            <td class="px-6 py-4 font-bold text-md">
              {{ conecction.authdate }}
            </td>
          </tr>
        </tbody>
      </TableComponent>
    </div>
  </div>
</template>

<script setup>
import TableComponent from '@/components/Flowbite/Table/TableComponent.vue';
import TheadComponent from '@/components/Flowbite/Table/TheadComponent.vue';
import ThComponent from '@/components/Flowbite/Table/ThComponent.vue';
import { onMounted, reactive, ref } from 'vue';
const connections = ref([]);

</script>
