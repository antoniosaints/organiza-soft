<template>
  <div
    class="bg-gray-100 dark:bg-gray-900 w-screen p-0 md:p-4 lg:p-16 h-screen flex lg:justify-between justify-center items-center"
  >
    <div class="w-0 lg:w-[60%] lg:p-14">
      <FwbImg src="logo-login.png" alt="logo" class="w-0 lg:w-[70%]" />
    </div>
    <div
      class="w-full lg:w-[40%] justify-center items-center flex flex-col h-screen md:h-auto md:max-w-md p-6 bg-white rounded-lg shadow dark:bg-gray-800"
    >
      <div class="max-w-lg text-center">
        <h1
          class="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white"
        >
          Organiza
          <span class="text-blue-600 dark:text-blue-500">SOFT</span>
        </h1>
        <p
          class="text-lg font-normal mb-10 text-gray-500 lg:text-xl dark:text-gray-400"
        >
          Gestão financeira, serviços, assinaturas e muito mais.
        </p>
      </div>
      <form class="w-full max-w-lg" @submit.prevent="loginUsuario">
        <div class="mb-5">
          <FwbInput
            v-model="usuario.email"
            required
            type="email"
            label="E-mail"
            placeholder="Seu e-mail"
          />
        </div>
        <div class="mb-5">
          <FwbInput
            v-model="usuario.password"
            required
            type="password"
            label="Senha"
            placeholder="•••••••••"
          />
        </div>
        <div class="flex items-start mb-5">
          <div class="flex items-center h-5">
            <FwbCheckbox v-model="lembrarUsuario" label="Lembrar de mim" />
          </div>
        </div>
        <FwbButton type="submit">Logar no sistema</FwbButton>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { reactive, ref } from "vue";
  import { FwbButton, FwbCheckbox, FwbImg, FwbInput } from "flowbite-vue";
  import IUserLogin from "@/types/login/IUserLogin";
  import { LoginService } from "@/services/login/loginService";
  import StorageUtil from "@/utils/storageUtil";

  const lembrarUsuario = ref<boolean>(
    JSON.parse(StorageUtil.get("@gestao_inteligente:lembrarSenha")) || false
  );

  const usuario = reactive(<IUserLogin>{
    email: StorageUtil.get("@gestao_inteligente:email") || "",
    password: StorageUtil.get("@gestao_inteligente:password") || "",
  });

  const loginUsuario = async () => {
    const login = await LoginService.login(usuario);
    if (login) {
      if (lembrarUsuario.value) {
        StorageUtil.set("@gestao_inteligente:lembrarSenha", true);
        StorageUtil.set("@gestao_inteligente:email", usuario.email);
        StorageUtil.set("@gestao_inteligente:password", usuario.password);
      } else {
        StorageUtil.remove("@gestao_inteligente:lembrarSenha");
        StorageUtil.remove("@gestao_inteligente:email");
        StorageUtil.remove("@gestao_inteligente:password");
      }
    }
  };
</script>
