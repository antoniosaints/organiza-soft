<script setup lang="ts">
import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { useColorMode } from '@vueuse/core';
import { ref } from 'vue';
import { RouterLink, RouterView, useRouter } from 'vue-router';
import { Moon, Sun } from 'lucide-vue-next';

const mode = useColorMode();
const isMenuOpen = ref(false);
const router = useRouter();

const navigate = (path: string) => {
    router.push(path);
};
</script>

<template>
    <div class="flex flex-col min-h-screen">
        <header class="dark:bg-gray-900 bg-white sticky top-0 left-0 shadow-none">
            <div class="container mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex max-w-7xl mx-auto h-16 items-center justify-between">
                    <a href="#" @click.prevent="navigate('/')" class="text-sm w-full md:w-1/3 font-medium text-foreground">
                        <div class="flex items-center">
                            <Avatar class="h-8 w-8">
                                <img src="/OS.png" alt="logo" />
                            </Avatar>
                            <span class="ml-2 text-xl font-semibold">Organiza Soft</span>
                        </div>
                    </a>
                    <nav class="hidden md:flex items-center justify-center space-x-4 w-1/3">
                        <a href="#features" class="text-sm font-medium text-foreground hover:text-blue-400">
                            Recursos
                        </a>
                        <a href="#pricing" class="text-sm font-medium text-foreground hover:text-blue-400">
                            Preços
                        </a>
                        <a href="#about" class="text-sm font-medium text-foreground hover:text-blue-400">
                            Sobre
                        </a>
                        <a href="#" @click.prevent="navigate('/cadastro')"
                            class="text-sm font-medium text-foreground hover:text-blue-400">
                            Criar conta
                        </a>
                        <RouterLink
                            class="md:text-md font-medium transition-all bg-inherit duration-300 hover:text-blue-600 hover:underline underline-offset-4"
                            to="/login">
                            <Button variant="default" class="rounded-full"> Login </Button>
                        </RouterLink>
                    </nav>
                    <button class="md:flex hidden w-1/3 items-end justify-end">
                        <Sun v-if="mode === 'light'" @click="mode = 'dark'"
                            class="h-8 w-8 p-1 bg-inherit text-gray-600 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none rounded-full flex items-center justify-center" />
                        <Moon v-if="mode === 'dark'" @click="mode = 'light'"
                            class="h-8 w-8 p-1 bg-inherit text-gray-600 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none rounded-full flex items-center justify-center" />
                    </button>
                    <div class="flex md:hidden">
                        <button @click="isMenuOpen = !isMenuOpen"
                            class="bg-inherit text-gray-600 dark:text-gray-200 hover:bg-gray-800 focus:outline-none h-10 w-10 rounded-full flex items-center justify-center">
                            <span class="sr-only">Abrir menu</span>
                            <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>
                </div>
                <!-- Menu móvel -->
                <nav v-if="isMenuOpen" class="md:hidden mt-4 space-y-2 py-4">
                    <a href="#features" @click="isMenuOpen = false"
                        class="block text-md text-center py-2 font-medium text-muted-foreground hover:text-primary">
                        Recursos
                    </a>
                    <a href="#pricing" @click="isMenuOpen = false"
                        class="block text-md text-center py-2 font-medium text-muted-foreground hover:text-primary">
                        Preços
                    </a>
                    <a href="#about" @click="isMenuOpen = false"
                        class="block text-md text-center py-2 font-medium text-muted-foreground hover:text-primary">
                        Sobre
                    </a>
                    <a href="#" @click.prevent="navigate('/cadastro'); isMenuOpen = false"
                        class="block text-md text-center py-2 font-medium text-muted-foreground hover:text-primary">
                        Criar conta
                    </a>
                    <RouterLink
                        class="md:text-md font-medium transition-all bg-inherit duration-300 hover:text-blue-600 hover:underline underline-offset-4"
                        to="/login">
                        <button class="bg-blue-900 text-white px-4 py-2 mt-2 rounded-full w-full">Login</button>
                    </RouterLink>
                </nav>
            </div>
        </header>
        <main class="flex-1 flex flex-col justify-center items-center">
            <RouterView />
        </main>
        <footer class="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
            <p class="text-xs text-gray-500 dark:text-gray-400">© 2024 Organiza Soft. Todos os direitos reservados.</p>
            <nav class="sm:ml-auto flex gap-4 sm:gap-6">
                <RouterLink
                    class="text-sm bg-transparent text-blue-400 hover:text-blue-600 cursor-pointer transition-all duration-300 hover:underline underline-offset-4"
                    to="/termos">
                    Termos de Serviço
                </RouterLink>
                <RouterLink
                    class="text-sm bg-transparent text-blue-400 hover:text-blue-600 cursor-pointer transition-all duration-300 hover:underline underline-offset-4"
                    to="/politica">
                    Privacidade
                </RouterLink>
            </nav>
        </footer>
    </div>
</template>
