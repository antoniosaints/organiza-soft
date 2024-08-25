<template>
  <div
    class="bg-gray-100 dark:bg-gray-900 w-screen p-0 md:p-4 lg:p-16 h-screen flex lg:justify-between justify-center items-center">
    <div class="w-0 lg:w-[60%] lg:p-14">
      <img src="/logo-login.png" alt="logo" class="w-0 lg:w-[70%]" />
    </div>
    <div
      class="w-full lg:w-[40%] justify-center items-center flex flex-col h-screen md:h-auto md:max-w-md p-6 bg-white rounded-lg shadow dark:bg-gray-800">
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
      <form class="w-full max-w-lg" @submit.prevent="loginUsuario">
        <div class="mb-5">
          <Label for="email">E-mail</Label>
          <Input class="border-2 border-gray-600" v-model="usuario.email" required type="email" label="E-mail"
            placeholder="Seu e-mail" />
        </div>
        <div class="mb-5">
          <Label for="password">Senha</Label>
          <Input class="border-2 border-gray-600" v-model="usuario.password" required type="password" label="Senha"
            placeholder="•••••••••" />
        </div>
        <div class="flex items-start mb-5">
          <div class="flex items-center h-5 space-x-2">
            <Switch id="airplane-mode" :checked="lembrarUsuario"
              @update:checked="() => (lembrarUsuario = !lembrarUsuario)" />
            <Label for="airplane-mode">Lembrar de mim</Label>
          </div>
        </div>
        <Button type="submit">Logar no sistema</Button>
      </form>
      <div class="flex justify-end w-full">
        <DropdownMenu>
          <DropdownMenuTrigger as-child>
            <Button variant="outline" class="dark:bg-gray-700">
              <Icon icon="radix-icons:moon"
                class="h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:-rotate-0 dark:scale-100" />
              <Icon icon="radix-icons:sun"
                class="absolute h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:rotate-90 dark:scale-0" />
              <span class="sr-only">Toggle theme</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem @click="mode = 'light'">
              Claro
            </DropdownMenuItem>
            <DropdownMenuItem @click="mode = 'dark'">
              Escuro
            </DropdownMenuItem>
            <DropdownMenuItem @click="mode = 'auto'">
              Automático
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import IUserLogin from "@/types/login/IUserLogin";
import { LoginService } from "@/services/login/loginService";
import StorageUtil from "@/utils/storageUtil";
import Button from "@/components/ui/button/Button.vue";
import Input from "@/components/ui/input/Input.vue";
import {Icon} from "@iconify/vue";
import Label from "@/components/ui/label/Label.vue";
import Switch from "@/components/ui/switch/Switch.vue";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useColorMode } from "@vueuse/core";

const mode = useColorMode();

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
