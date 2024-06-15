<template>
  <div class="p-4">
    <!-- Breadcrumb -->
    <nav
      class="flex px-5 py-3 mb-4 text-gray-700 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700"
      aria-label="Breadcrumb">
      <ol class="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
        <li class="inline-flex items-center">
          <a href="#"
            class="inline-flex items-center text-sm font-medium text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
            <svg class="w-3 h-3 me-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
              viewBox="0 0 20 20">
              <path
                d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
            </svg>
            Usuários
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
              class="ms-1 text-sm font-medium text-gray-900 hover:text-blue-600 md:ms-2 dark:text-gray-400 dark:hover:text-white">Listagem
              de usuários</a>
          </div>
        </li>
      </ol>
    </nav>
    <div class="flex justify-between pb-3">
      <p class="text-2xl font-bold text-gray-900 dark:text-white">Usuários</p>
      <IconComponent @click="buscarUsuarios()"
        class="w-3 h-3 py-2 px-3 rounded mr-1 cursor-pointer dark:bg-blue-900 dark:text-blue-200 bg-blue-300 text-blue-900"
        icon="redo" />
    </div>

    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
      <TableComponent>
        <TheadComponent>
          <tr>
            <ThComponent> # </ThComponent>
            <ThComponent> Nome </ThComponent>
            <ThComponent> E-mail </ThComponent>
            <ThComponent> Regra </ThComponent>
            <ThComponent> Status </ThComponent>
            <ThComponent alinhar="justify-end"> Opções </ThComponent>
          </tr>
        </TheadComponent>
        <tbody v-if="autorizacao.canList('usuarios') || autorizacao.isAdmin">
          <tr v-for="usuario in storeUsers.users" :key="usuario.id"
            class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <th scope="row" class="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
              <p
                class="dark:bg-blue-900 dark:text-blue-400 text-blue-600 font-bold p-1 rounded bg-blue-200 text-center ">
                {{ usuario.id }}</p>
            </th>
            <th class="px-6 py-2 ">
              {{ usuario.nome }}
            </th>
            <td class="px-6 py-2">
              <p class="dark:text-blue-300 text-blue-600 font-bold">{{ usuario.email || 'Não informado' }}</p>
            </td>
            <td class="px-6 py-2 font-bold">{{ usuario.regra || 'Não informado' }}</td>
            <td class="px-6 py-2 font-bold">
              <p v-if="usuario.status === 'Ativo'" @click="updatestatusUsuario(usuario.id)"
                class="dark:bg-blue-900 dark:text-blue-400 text-blue-600 font-bold p-1 rounded bg-blue-200 text-center ">
                {{ usuario.status || 'Não informado' }}</p>
              <p v-else
                class="dark:bg-red-900 dark:text-red-400 text-red-600 font-bold p-1 rounded bg-red-200 text-center ">
                {{ usuario.status || 'Não informado' }}
              </p>
            </td>
            <td class="px-6 py-2 text-right">
              <IconComponent @click="storeUsers.deleteUser(usuario.id)"
                v-if="autorizacao.canDelete('usuarios') || autorizacao.isAdmin"
                class="w-3 h-3 py-2 px-3 rounded mr-1 cursor-pointer dark:bg-red-900 dark:text-red-200 bg-red-300 text-red-900"
                icon="trash" />
                <IconComponent @click="editarUsuario(usuario.id)"
                v-if="autorizacao.canUpdate('usuarios') || autorizacao.isAdmin"
                class="w-3 h-3 py-2 px-3 rounded mr-1 cursor-pointer dark:bg-green-900 dark:text-green-200 bg-green-300 text-green-900"
                icon="edit" />
            </td>
          </tr>
        </tbody>
        <tbody v-else>
          <tr>
            <td class="px-6 py-4 font-bold text-md bg-gray-800 text-center" colspan="6">Você não tem permissão para visualizar usuários</td>
          </tr>
        </tbody>
      </TableComponent>
    </div>
    <Modal ref="modalNovoUsuario" modalName="Novo usuário" buttonName="Novo usuário" colorButton="bg-blue-700">
      <NovoUsuario @userCreated="modalNovoUsuario.toggleModal()" />
    </Modal>
    <div data-dial-init class="fixed end-4 bottom-20 group" v-if="autorizacao.canCreate('usuarios') || autorizacao.isAdmin">
      <button type="button" aria-expanded="false" @click="novoUsuario"
        class="flex items-center justify-center text-white bg-blue-700 rounded-full w-14 h-14 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:focus:ring-blue-800">
        <svg class="w-5 h-5 transition-transform" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
          viewBox="0 0 18 18">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M9 1v16M1 9h16" />
        </svg>
        <span class="sr-only">Novo usuário</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import TableComponent from '@/components/Flowbite/Table/TableComponent.vue';
import TheadComponent from '@/components/Flowbite/Table/TheadComponent.vue';
import ThComponent from '@/components/Flowbite/Table/ThComponent.vue';
import Modal from '@/components/Flowbite/Modal.vue';
import NovoUsuario from '@/views/Usuarios/NovoUsuarioView.vue';
import { userStore } from '@/stores/Usuarios/userStore';
import { useAutorizacaoStore } from '@/stores/Permissoes/autorizacaoStore'
import IconComponent from '@/components/Fontawesome/IconComponent.vue';
const storeUsers = userStore();
const autorizacao = useAutorizacaoStore();

const modalNovoUsuario = ref(null); //  do caralho
onMounted(async () => {
  await buscarUsuarios();
})

const buscarUsuarios = async () => {
  await storeUsers.getUsers();
}

const updatestatusUsuario = async (id) => {
  alert("Em desenvolvimento")
}

const editarUsuario = async (id) => {
  await storeUsers.setUserEdit(id)
  modalNovoUsuario.value.toggleModal()
}

const novoUsuario = async () => {
  await storeUsers.setUserEdit(null)
  modalNovoUsuario.value.toggleModal()
}

</script>
