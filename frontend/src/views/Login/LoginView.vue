<template>
  <div class="bg-gray-100 dark:bg-gray-900 w-screen p-0 md:p-4 lg:p-16 h-screen flex lg:justify-between justify-center items-center">
    <div class="w-0 lg:w-[60%] lg:p-14">
      <FwbImg src="logo-login.png" alt="logo" class="w-0 lg:w-[70%]" />
    </div>
    <div class="w-full lg:w-[40%] justify-center items-center flex flex-col h-screen md:h-auto md:max-w-md p-6 bg-white rounded-lg shadow dark:bg-gray-800">
      <div class="max-w-lg text-center">
        <h1
          class="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
          Organiza
          <span class="text-blue-600 dark:text-blue-500">SOFT</span>
        </h1>
        <p class="text-lg font-normal mb-10 text-gray-500 lg:text-xl dark:text-gray-400">
          Gestão financeira, serviços, assinaturas e muito mais.
        </p>
      </div>
      <form class="w-full max-w-lg" @submit.prevent="loginUsuarioSistema">
        <div class="mb-5">
          <FwbInput v-model="user.email" required type="email" label="E-mail" placeholder="Seu e-mail" />
        </div>
        <div class="mb-5">
          <FwbInput v-model="user.password" required type="password" label="Senha" placeholder="•••••••••" />
        </div>
        <div class="flex items-start mb-5">
          <div class="flex items-center h-5">
            <FwbCheckbox  v-model="rememberMe" label="Lembrar de mim" />
          </div>
        </div>
        <FwbButton type="submit">Logar no sistema</FwbButton>
      </form>
    </div>

  </div>
</template>

<script setup>
import router from '@/routes/Router';
import toast from '@/utils/toast';
import { useLoginStore } from '@/stores/login';
import { reactive, ref } from 'vue';
import { FwbButton, FwbCheckbox, FwbImg, FwbInput } from 'flowbite-vue';

const rememberMe = ref(JSON.parse(localStorage.getItem("rememberMe")) || false);
const user = reactive({
  email: localStorage.getItem("@gestao_inteligente:email") || '',
  password: localStorage.getItem("@gestao_inteligente:password") || '',
})

const loginUsuarioSistema = async () => {
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
    toast.success(logged.message, 'Logado!');
    router.push({ path: '/' });
  } else {
    toast.error(logged.message, 'Ops..');
  }
}

</script>