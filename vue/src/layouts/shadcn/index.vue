<template>
    <div class="flex min-h-screen w-full bg-background text-foreground">
        <aside :class="sidebarClasses">
            <div class="flex h-16 items-center justify-between px-4">
                <router-link to="/" class="flex items-center gap-2 font-bold dark:bg-gray-950 bg-white">
                    <Wallet />
                    <span class="text-lg">Organiza Soft</span>
                </router-link>
                <button type="button" class="lg:hidden" @click="toggleSidebar">
                    <Menu />
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
                                <router-link to="/contact"
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
        <div class="flex-1 lg:pl-64">
            <header
                class="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-border bg-background px-4 shadow-sm lg:px-6">
                <div class="flex items-center gap-4">
                    <button type="button" class="lg:hidden" @click="toggleSidebar">
                        <Menu />
                    </button>
                    <breadcrumb>
                        <breadcrumb-list>
                            <breadcrumb-item>
                                <router-link to="/">Home</router-link>
                            </breadcrumb-item>
                            <breadcrumb-separator />
                            <breadcrumb-item>
                                <span>Dashboard</span>
                            </breadcrumb-item>
                        </breadcrumb-list>
                    </breadcrumb>
                </div>
                <div class="flex items-center gap-4">
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
                    <dropdown-menu>
                        <dropdown-menu-trigger>
                            <avatar class="h-9 w-9">
                                <AvatarImage src="/logo-login.png" />
                                <AvatarFallback>JP</AvatarFallback>
                            </avatar>
                        </dropdown-menu-trigger>
                        <dropdown-menu-content>
                            <dropdown-menu-item><router-link to="/perfil">
                                    <iconFA class="h-3 w-3 mr-2" icon="fa-user" /> Perfil
                                </router-link></dropdown-menu-item>
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

<script setup>
import { ref, computed } from 'vue';
import { House, LockKeyhole, Users, List, PackageOpen, Wallet, Menu, ChevronRight, LogOut, User } from 'lucide-vue-next'
import { Icon } from "@iconify/vue";
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible"
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from "@/components/ui/breadcrumb"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { useColorMode } from '@vueuse/core';

const mode = useColorMode();

const isSidebarOpen = ref(false);

const toggleSidebar = () => {
    isSidebarOpen.value = !isSidebarOpen.value;
};

const sidebarClasses = computed(() => {
    return `fixed inset-y-0 left-0 z-20 flex w-64 flex-col border-r border-border bg-background
      transition-all duration-300 ${isSidebarOpen.value ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`;
});
</script>