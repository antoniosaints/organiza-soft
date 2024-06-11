<template>
  <div class="bg-gray-100 flex-col dark:bg-gray-900 w-screen p-4 h-screen flex justify-center items-center">
    <div class="max-w-lg text-center">
      <h1
        class="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
        Saints
        <span class="text-emerald-600 dark:text-emerald-500">Software</span>
      </h1>
      <p class="text-lg font-normal mb-10 text-gray-500 lg:text-xl dark:text-gray-400">
        Gestão financeira, serviços, assinaturas e muito mais.
      </p>
    </div>

    <form class="w-full max-w-lg bg-slate-100 dark:bg-gray-900" @submit.prevent="auth">

      <div class="mb-5">
        <label for="text" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Usuário</label>
        <input type="text" id="text" v-model="user.email"
          class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-emerald-500 dark:focus:border-emerald-500 dark:shadow-sm-light"
          placeholder="Seu e-mail" required />
      </div>
      <div class="mb-5">
        <label for="senha" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Senha</label>
        <input type="senha" id="senha" placeholder="•••••••••" v-model="user.password"
          class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-emerald-500 dark:focus:border-emerald-500 dark:shadow-sm-light"
          required />
      </div>
      <div class="flex items-start mb-5">
        <div class="flex items-center h-5">
          <input id="terms" type="checkbox" @click="toggleRememberMe" :checked="rememberMe"
            class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-emerald-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-emerald-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" />
        </div>
        <label for="terms" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Lembrar de mim</label>
      </div>
      <button type="submit"
        class="text-white w-full lg:w-auto md:w-auto bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800">
        Entrar
      </button>
    </form>
  </div>
</template>

<script setup>
import router from '@/routes/Router';
import toast from '@/utils/toast';
import { useLoginStore } from '@/stores/login';
import { reactive, ref } from 'vue';

const rememberMe = ref(JSON.parse(localStorage.getItem("rememberMe")) || false);
const user = reactive({
  email: localStorage.getItem("@gestao_inteligente:email") || '',
  password: localStorage.getItem("@gestao_inteligente:password") || '',
})

const toggleRememberMe = () => {
  rememberMe.value = !rememberMe.value
}
const auth = async () => {
  const logged = await useLoginStore().login(user);
  if (logged.success == true) {
    if (rememberMe.value == true) {
      localStorage.setItem("rememberMe", true);
      localStorage.setItem("@gestao_inteligente:email", user.email)
      localStorage.setItem("@gestao_inteligente:password", user.password)
    } else {
      localStorage.removeItem("rememberMe");
      localStorage.removeItem("@gestao_inteligente:email");
      localStorage.removeItem("@gestao_inteligente:password");
    }
    router.push('/');
    toast.success(logged.message, 'Logado!');
  } else {
    toast.error(logged.message, 'Ops..');
  }
}

</script>