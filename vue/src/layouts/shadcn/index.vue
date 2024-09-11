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
                    <collapsible v-slot="{ open }" class="grid gap-2">
                        <collapsible-trigger
                            class="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted">
                            <LockKeyhole />
                            <span>Administração</span>
                            <ChevronRight class="ml-auto h-4 w-4 transition-transform" :class="{ 'rotate-90': open }" />
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
                                    <span>Logs</span>
                                </router-link>
                            </div>
                        </collapsible-content>
                    </collapsible>
                    <collapsible v-slot="{ open }" class="grid gap-2">
                        <collapsible-trigger
                            class="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted">
                            <Tags />
                            <span>Vendas</span>
                            <ChevronRight class="ml-auto h-4 w-4 transition-transform" :class="{ 'rotate-90': open }" />
                        </collapsible-trigger>
                        <collapsible-content>
                            <div class="grid gap-2 pl-6">
                                <router-link to="/vendas/pdv"
                                    class="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted">
                                    <Computer />
                                    <span>PDV</span>
                                </router-link>
                                <router-link to="/vendas/resumo"
                                    class="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted">
                                    <FileText />
                                    <span>Resumo</span>
                                </router-link>
                            </div>
                        </collapsible-content>
                    </collapsible>
                    <collapsible v-slot="{ open }" class="grid gap-2">
                        <collapsible-trigger
                            class="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted">
                            <Landmark />
                            <span>Financeiro</span>
                            <ChevronRight class="ml-auto h-4 w-4 transition-transform" :class="{ 'rotate-90': open }" />
                        </collapsible-trigger>
                        <collapsible-content>
                            <div class="grid gap-2 pl-6">
                                <router-link to="/financeiro/lancamentos"
                                    class="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted">
                                    <Wallet />
                                    <span>Lançamentos</span>
                                </router-link>
                                <router-link to="/financeiro/dre"
                                    class="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted">
                                    <FileText />
                                    <span>DRE</span>
                                </router-link>
                            </div>
                        </collapsible-content>
                    </collapsible>
                    <collapsible v-slot="{ open }" class="grid gap-2">
                        <collapsible-trigger
                            class="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted">
                            <Package />
                            <span>Patrimônio</span>
                            <ChevronRight class="ml-auto h-4 w-4 transition-transform" :class="{ 'rotate-90': open }" />
                        </collapsible-trigger>
                        <collapsible-content>
                            <div class="grid gap-2 pl-6">
                                <router-link to="/patrimonio/produtos"
                                    class="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted">
                                    <Boxes />
                                    <span>Produtos</span>
                                </router-link>
                                <router-link to="/patrimonio/servicos"
                                    class="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted">
                                    <BookOpenCheck />
                                    <span>Serviços</span>
                                </router-link>
                                <router-link to="/patrimonio/categorias"
                                    class="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted">
                                    <Group />
                                    <span>Categorias</span>
                                </router-link>
                            </div>
                        </collapsible-content>
                    </collapsible>
                </nav>
            </div>
            <div class="mb-4 mx-3">
                <div 
                    @click="LoginService.logout()"
                    class="flex text-red-500 cursor-pointer items-center gap-2 rounded-md px-3 py-2 text-sm font-bold transition-colors hover:bg-muted">
                    <LogOut />
                    <span>Logout</span>
                </div>
            </div>
        </aside>
        <div class="flex-1 w-[inherit]" :class="mainContentClass">
            <header
                class="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-border bg-background px-4 shadow-sm lg:px-6">
                <div class="flex items-center gap-4">
                    <button type="button" class="" @click="toggleSidebar">
                        <PanelLeftOpen v-if="!isSidebarOpen" />
                        <PanelLeftClose v-else />
                    </button>
                    <BreadCrumb />
                </div>
                <div class="flex items-center gap-4">
                    <ToogleMode />
                    <ProfileHome />
                </div>
            </header>
            <main class="p-4 lg:p-6">
                <router-view v-if="showComponent" v-slot="{ Component }">
                    <transition name="fade" @before-enter="beforeEnter" @after-leave="afterLeave">
                        <component :is="Component" />
                    </transition>
                </router-view>
            </main>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { House, LockKeyhole, Users, List, Wallet, ChevronRight, LogOut, PanelLeftOpen, PanelLeftClose, Landmark, FileText, Package, Boxes, Group, Computer, Tags, BookOpenCheck } from 'lucide-vue-next'
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible"
import { BreadCrumb, ProfileHome, ToogleMode } from '.';
import { LoginService } from '@/services/login/loginService';

const showComponent = ref(true);
const beforeEnter = () => {
    showComponent.value = false;
};
const afterLeave = () => {
    showComponent.value = true;
};

const isSidebarOpen = ref(window.innerWidth <= 768 ? false : true);

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

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.1s ease, transform 0.1s ease;
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
    /* transform: translateX(-100%); */
}

.fade-leave,
.fade-enter-to {
    opacity: 1;
    /* transform: translateX(0%); */
}
</style>