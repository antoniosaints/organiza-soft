<template>
    <div class="flex min-h-screen w-full bg-background text-foreground">
        <aside :class="sidebarClasses">
            <div class="flex h-16 items-center justify-between px-4">
                <router-link to="/" class="flex items-center gap-2 font-bold dark:bg-gray-950 bg-white">
                    <Wallet />
                    <span class="text-lg">Organiza Soft</span>
                </router-link>
                <button type="button" class="lg:hidden" @click="toggleSidebar">
                    <PanelLeftClose />
                </button>
            </div>
            <div class="flex-1 overflow-y-auto px-2 py-4">
                <nav class="grid gap-2">
                    <router-link to="/dashboard"
                        class="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted">
                        <House />
                        <span>Dashboard</span>
                    </router-link>
                    <collapsible class="grid gap-2">
                        <collapsible-trigger
                            class="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted">
                            <LockKeyhole />
                            <span>Administração</span>
                            <ChevronRight class="ml-auto h-4 w-4 transition-transform" />
                        </collapsible-trigger>
                        <collapsible-content>
                            <div class="grid gap-2 pl-6">
                                <router-link to="/administracao/usuarios"
                                    class="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted">
                                    <Users />
                                    <span>Usuários</span>
                                </router-link>
                                <router-link to="/administracao/produtos"
                                    class="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted">
                                    <List />
                                    <span>Contatos</span>
                                </router-link>
                            </div>
                        </collapsible-content>
                    </collapsible>
                    <router-link to="/products"
                        class="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted">
                        <PackageOpen />
                        <span>Patrimônio</span>
                    </router-link>
                </nav>
            </div>
            <nav class="mb-4 mx-3">
                <router-link to="/login"
                    class="flex text-red-600 items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted">
                    <LogOut />
                    <span>Logout</span>
                </router-link>
            </nav>
        </aside>
        <div class="flex-1 w-[inherit]" :class="mainContentClass">
            <header
                class="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-border bg-background px-4 shadow-sm lg:px-6">
                <div class="flex items-center gap-4">
                    <button type="button" class="" @click="toggleSidebar">
                        <PanelLeftOpen v-if="!isSidebarOpen" />
                        <PanelLeftClose v-else />
                    </button>
                    <breadcrumb>
                        <breadcrumb-list>
                            <breadcrumb-item v-for="(route, index) in breadcrumbRoutes" :key="index">
                                <template v-if="index !== breadcrumbRoutes.length - 1">
                                    <router-link :to="route.path">{{ route.meta.breadcrumb }}</router-link>
                                    <breadcrumb-separator />
                                </template>
                                <template v-else>
                                    <span>{{ route.meta.breadcrumb }}</span>
                                </template>
                            </breadcrumb-item>
                        </breadcrumb-list>
                    </breadcrumb>
                </div>
                <div class="flex items-center gap-4">
                    <DropdownMenu>
                        <DropdownMenuTrigger as-child>
                            <Button variant="outline" class="h-10 w-10 p-0 dark:bg-gray-950 dark:hover:bg-gray-800 rounded-full">
                                <Icon icon="radix-icons:moon"
                                    class="h-[1rem] w-[1rem] rotate-90 scale-0 transition-all dark:-rotate-0 dark:scale-100" />
                                <Icon icon="radix-icons:sun"
                                    class="absolute h-[1rem] w-[1rem] rotate-0 scale-100 transition-all dark:rotate-90 dark:scale-0" />
                                <span class="sr-only">Toggle theme</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem @click="toggleMode('light')">
                                Claro
                            </DropdownMenuItem>
                            <DropdownMenuItem @click="toggleMode('dark')">
                                Escuro
                            </DropdownMenuItem>
                            <DropdownMenuItem @click="toggleMode('auto')">
                                Automático
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <dropdown-menu>
                        <dropdown-menu-trigger>
                            <avatar class="h-9 w-9">
                                <AvatarImage src="/logo-login.png" />
                                <AvatarFallback>JP</AvatarFallback>
                            </avatar>
                        </dropdown-menu-trigger>
                        <dropdown-menu-content>
                            <dropdown-menu-item as-child>
                                <router-link to="/perfil">
                                    <iconFA class="h-3 w-3 mr-2" icon="fa-user" /> Perfil
                                </router-link>
                            </dropdown-menu-item>
                            <dropdown-menu-item>
                                <iconFA class="h-3 w-3 mr-2" icon="fa-cogs" /> Configs
                            </dropdown-menu-item>
                            <dropdown-menu-separator />
                            <dropdown-menu-item>
                                <iconFA class="h-3 w-3 mr-2" icon="fa-right-from-bracket" /> Sair
                            </dropdown-menu-item>
                        </dropdown-menu-content>
                    </dropdown-menu>
                </div>
            </header>
            <main class="p-4 lg:p-6">
                <router-view />
            </main>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { House, LockKeyhole, Users, List, PackageOpen, Wallet, Menu, ChevronRight, LogOut, PanelLeftOpen, PanelLeftClose } from 'lucide-vue-next'
import { Icon } from "@iconify/vue";
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible"
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { useColorMode } from '@vueuse/core';
import { useRoute } from 'vue-router';
import { ITheme } from '@/types/interface/ITheme';

const mode = useColorMode();

const toggleMode = (theme: ITheme) => {
    mode.value = theme;
};

const route = useRoute();
const breadcrumbRoutes = computed(() => {
    return route.matched.filter(route => route.meta && route.meta.breadcrumb)
})

const isSidebarOpen = ref(true);

const toggleSidebar = () => {
    isSidebarOpen.value = !isSidebarOpen.value;
};

const mainContentClass = computed(() => {
    return `${isSidebarOpen.value ? 'lg:pl-64' : 'lg:pl-0'}`
})
const sidebarClasses = computed(() => {
    return `fixed inset-y-0 left-0 z-20 flex w-64 flex-col border-r border-border bg-background
      transition-all duration-300 ${isSidebarOpen.value ? 'translate-x-0' : '-translate-x-full'}`;
});
</script>

<style scoped>
.breadcrumb {
    display: flex;
    list-style: none;
    padding: 0;
}

.breadcrumb-item+.breadcrumb-item::before {
    content: ">";
    padding: 0 5px;
}
</style>