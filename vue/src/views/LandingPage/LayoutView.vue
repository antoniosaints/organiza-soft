<script setup lang="ts">
import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { useColorMode } from '@vueuse/core';
import { RouterLink, RouterView } from 'vue-router';

useColorMode();
</script>

<template>
    <div class="flex flex-col min-h-screen">
        <header
            class="px-4 lg:px-6 h-14 flex items-center sticky top-0 z-10 bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-600">
            <RouterLink class="flex items-center bg-transparent justify-center transition-all duration-300 ease-in-out"
                to="/site/home">
                <Avatar class="h-8 w-8">
                    <img src="/OS.png" alt="logo" />
                </Avatar>
                <span class="text-3xl text-black dark:text-white font-bold ml-2">Organiza Soft</span>
            </RouterLink>

            <nav class="ml-auto flex items-center gap-4 sm:gap-6 text-blue-900 dark:text-white">
                <a class="md:text-md font-medium transition-all bg-inherit duration-300 hover:text-blue-600 hover:underline underline-offset-4"
                    href="#features">
                    Recursos
                </a>
                <a class="md:text-md font-medium transition-all bg-inherit duration-300 hover:text-blue-600 hover:underline underline-offset-4"
                    href="#pricing">
                    Preços
                </a>
                <a class="md:text-md font-medium transition-all bg-inherit duration-300 hover:text-blue-600 hover:underline underline-offset-4"
                    href="#about">
                    Sobre
                </a>
                <RouterLink
                    class="md:text-md font-medium transition-all bg-transparent text-blue-400 duration-300 hover:text-blue-600 hover:underline underline-offset-4"
                    to="/site/cadastro">
                    Criar conta
                </RouterLink>
                <RouterLink
                    class="md:text-md font-medium transition-all bg-inherit duration-300 hover:text-blue-600 hover:underline underline-offset-4"
                    to="/login">
                    <Button variant="default" class="rounded-full"> Login </Button>
                </RouterLink>

            </nav>
        </header>
        <main class="flex-1 flex flex-col justify-center items-center">
            <RouterView />
        </main>
        <footer class="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
            <p class="text-xs text-gray-500 dark:text-gray-400">© 2024 Organiza Soft. Todos os direitos reservados.</p>
            <nav class="sm:ml-auto flex gap-4 sm:gap-6">
                <RouterLink class="text-sm bg-transparent text-blue-400 hover:text-blue-600 cursor-pointer transition-all duration-300 hover:underline underline-offset-4"
                    to="/site/termos">
                    Termos de Serviço
                </RouterLink>
                <RouterLink class="text-sm bg-transparent text-blue-400 hover:text-blue-600 cursor-pointer transition-all duration-300 hover:underline underline-offset-4"
                    to="/site/politica">
                    Privacidade
                </RouterLink>
            </nav>
        </footer>
    </div>
</template>
