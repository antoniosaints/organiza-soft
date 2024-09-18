<template>
    <div class="flex min-h-screen w-full bg-background text-foreground">
        <aside :class="sidebarClasses">
            <div class="flex h-16 border-white/30 border-b-2 items-center bg-sidebar justify-between text-white px-4">
                <div to="/" class="flex items-center gap-2 font-bold">
                    <img src="/OS.png" alt="logo" class="h-8 w-8 rounded-full">
                    <span class="text-xl">Organiza Soft</span>
                </div>
                <button type="button" class="lg:hidden" @click="toggleSidebar">
                    <PanelLeftClose />
                </button>
            </div>
            <div class="flex-1 overflow-y-auto bg-sidebar text-white px-2 py-4">
                <nav class="grid gap-2">
                    <router-link to="/dashboard"
                        class="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-sidebar-hover">
                        <House />
                        <span>Dashboard</span>
                    </router-link>
                    <collapsible v-slot="{ open }" class="grid gap-2">
                        <collapsible-trigger
                            class="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-sidebar-hover">
                            <LockKeyhole />
                            <span>Administração</span>
                            <ChevronRight class="ml-auto h-4 w-4 transition-transform" :class="{ 'rotate-90': open }" />
                        </collapsible-trigger>
                        <collapsible-content>
                            <div class="grid gap-2 pl-6">
                                <router-link to="/administracao/usuarios"
                                    class="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-sidebar-hover">
                                    <Users />
                                    <span>Usuários</span>
                                </router-link>
                                <router-link to="/administracao/regras"
                                    class="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-sidebar-hover">
                                    <List />
                                    <span>Logs</span>
                                </router-link>
                            </div>
                        </collapsible-content>
                    </collapsible>
                    <collapsible v-slot="{ open }" class="grid gap-2">
                        <collapsible-trigger
                            class="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-sidebar-hover">
                            <Layers />
                            <span>CRM</span>
                            <div class="ml-auto flex space-x-1 items-center">
                                <Badge v-if="true" variant="destructive"> {{ stateDevelopment }} </Badge>
                                <ChevronRight class="ml-auto h-4 w-4 transition-transform"
                                    :class="{ 'rotate-90': open }" />
                            </div>
                        </collapsible-trigger>
                        <collapsible-content>
                            <div class="grid gap-2 pl-6">
                                <router-link to="/patrimonio/categorias"
                                    class="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-sidebar-hover">
                                    <FileChartPie />
                                    <span>Resumo</span>
                                </router-link>
                                <router-link to="/vendas/pdv"
                                    class="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-sidebar-hover">
                                    <User />
                                    <span>Clientes</span>
                                </router-link>
                                <router-link to="/vendas/pdv"
                                    class="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-sidebar-hover">
                                    <ClipboardCheck />
                                    <span>Relatórios</span>
                                </router-link>
                                <collapsible v-slot="{ open }" class="grid gap-2">
                                    <collapsible-trigger
                                        class="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-sidebar-hover">
                                        <Settings2 />
                                        <span>Outros</span>
                                        <ChevronRight class="ml-auto h-4 w-4 transition-transform"
                                            :class="{ 'rotate-90': open }" />
                                    </collapsible-trigger>
                                    <collapsible-content>
                                        <div class="grid gap-2 pl-6">
                                            <router-link to="/patrimonio/categorias"
                                                class="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-sidebar-hover">
                                                <Contact />
                                                <span>Tipos</span>
                                            </router-link>
                                        </div>
                                    </collapsible-content>
                                </collapsible>
                            </div>
                        </collapsible-content>
                    </collapsible>
                    <collapsible v-slot="{ open }" class="grid gap-2">
                        <collapsible-trigger
                            class="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-sidebar-hover">
                            <Tags />
                            <span>Vendas</span>
                            <div class="ml-auto flex space-x-1 items-center">
                                <Badge v-if="true" variant="destructive"> {{ stateDevelopment }} </Badge>
                                <ChevronRight class="ml-auto h-4 w-4 transition-transform"
                                    :class="{ 'rotate-90': open }" />
                            </div>
                        </collapsible-trigger>
                        <collapsible-content>
                            <div class="grid gap-2 pl-6">
                                <router-link to="/patrimonio/categorias"
                                    class="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-sidebar-hover">
                                    <FileChartPie />
                                    <span>Resumo</span>
                                </router-link>
                                <router-link to="/vendas/pdv"
                                    class="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-sidebar-hover">
                                    <Computer />
                                    <span>PDV</span>
                                </router-link>
                                <router-link to="/vendas/pdv"
                                    class="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-sidebar-hover">
                                    <ClipboardCheck />
                                    <span>Relatórios</span>
                                </router-link>
                            </div>
                        </collapsible-content>
                    </collapsible>
                    <collapsible v-slot="{ open }" class="grid gap-2">
                        <collapsible-trigger
                            class="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-sidebar-hover">
                            <Landmark />
                            <span>Financeiro</span>
                            <div class="ml-auto flex space-x-1 items-center">
                                <Badge v-if="true" variant="destructive"> {{ stateDevelopment }} </Badge>
                                <ChevronRight class="ml-auto h-4 w-4 transition-transform"
                                    :class="{ 'rotate-90': open }" />
                            </div>
                        </collapsible-trigger>
                        <collapsible-content>
                            <div class="grid gap-2 pl-6">
                                <router-link to="/patrimonio/categorias"
                                    class="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-sidebar-hover">
                                    <FileChartPie />
                                    <span>Resumo</span>
                                </router-link>
                                <router-link to="/financeiro/lancamentos"
                                    class="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-sidebar-hover">
                                    <Wallet />
                                    <span>Lançamentos</span>
                                </router-link>
                                <router-link to="/financeiro/dre"
                                    class="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-sidebar-hover">
                                    <FileText />
                                    <span>DRE</span>
                                </router-link>
                                <collapsible v-slot="{ open }" class="grid gap-2">
                                    <collapsible-trigger
                                        class="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-sidebar-hover">
                                        <Settings2 />
                                        <span>Outros</span>
                                        <ChevronRight class="ml-auto h-4 w-4 transition-transform"
                                            :class="{ 'rotate-90': open }" />
                                    </collapsible-trigger>
                                    <collapsible-content>
                                        <div class="grid gap-2 pl-6">
                                            <router-link to="/financeiro/dre"
                                                class="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-sidebar-hover">
                                                <WalletMinimal />
                                                <span>Contas</span>
                                            </router-link>
                                            <router-link to="/financeiro/dre"
                                                class="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-sidebar-hover">
                                                <CircleDollarSign />
                                                <span>Formas pg.</span>
                                            </router-link>
                                            <router-link to="/financeiro/dre"
                                                class="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-sidebar-hover">
                                                <Group />
                                                <span>Categorias</span>
                                            </router-link>
                                        </div>
                                    </collapsible-content>
                                </collapsible>
                            </div>
                        </collapsible-content>
                    </collapsible>
                    <collapsible v-slot="{ open }" class="grid gap-2">
                        <collapsible-trigger
                            class="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-sidebar-hover">
                            <Package />
                            <span>Patrimônio</span>
                            <div class="ml-auto flex space-x-1 items-center">
                                <Badge v-if="true" variant="destructive"> {{ stateDevelopment }} </Badge>
                                <ChevronRight class="ml-auto h-4 w-4 transition-transform"
                                    :class="{ 'rotate-90': open }" />
                            </div>
                        </collapsible-trigger>
                        <collapsible-content>
                            <div class="grid gap-2 pl-6">
                                <router-link to="/patrimonio/categorias"
                                    class="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-sidebar-hover">
                                    <FileChartPie />
                                    <span>Resumo</span>
                                </router-link>
                                <router-link to="/patrimonio/produtos"
                                    class="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-sidebar-hover">
                                    <Archive />
                                    <span>Produtos</span>
                                </router-link>
                                <router-link to="/patrimonio/produtos"
                                    class="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-sidebar-hover">
                                    <Boxes />
                                    <span>Estoques</span>
                                </router-link>
                                <collapsible v-slot="{ open }" class="grid gap-2">
                                    <collapsible-trigger
                                        class="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-sidebar-hover">
                                        <Settings2 />
                                        <span>Outros</span>
                                        <ChevronRight class="ml-auto h-4 w-4 transition-transform"
                                            :class="{ 'rotate-90': open }" />
                                    </collapsible-trigger>
                                    <collapsible-content>
                                        <div class="grid gap-2 pl-6">
                                            <router-link to="/patrimonio/categorias"
                                                class="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-sidebar-hover">
                                                <Group />
                                                <span>Categorias</span>
                                            </router-link>
                                        </div>
                                    </collapsible-content>
                                </collapsible>
                            </div>
                        </collapsible-content>
                    </collapsible>
                    <collapsible v-slot="{ open }" class="grid gap-2">
                        <collapsible-trigger
                            class="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-sidebar-hover">
                            <FileDigit />
                            <span>Serviços</span>
                            <div class="ml-auto flex space-x-1 items-center">
                                <Badge v-if="true" variant="destructive"> {{ stateDevelopment }} </Badge>
                                <ChevronRight class="ml-auto h-4 w-4 transition-transform"
                                    :class="{ 'rotate-90': open }" />
                            </div>
                        </collapsible-trigger>
                        <collapsible-content>
                            <div class="grid gap-2 pl-6">
                                <router-link to="/patrimonio/categorias"
                                    class="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-sidebar-hover">
                                    <FileChartPie />
                                    <span>Resumo</span>
                                </router-link>
                                <router-link to="/patrimonio/servicos"
                                    class="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-sidebar-hover">
                                    <BookOpenCheck />
                                    <span>Ordens de Serviço</span>
                                </router-link>
                                <router-link to="/patrimonio/servicos"
                                    class="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-sidebar-hover">
                                    <FileCheck />
                                    <span>Serviços</span>
                                </router-link>
                                <collapsible v-slot="{ open }" class="grid gap-2">
                                    <collapsible-trigger
                                        class="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-sidebar-hover">
                                        <Settings2 />
                                        <span>Outros</span>
                                        <ChevronRight class="ml-auto h-4 w-4 transition-transform"
                                            :class="{ 'rotate-90': open }" />
                                    </collapsible-trigger>
                                    <collapsible-content>
                                        <div class="grid gap-2 pl-6">
                                            <router-link to="/patrimonio/categorias"
                                                class="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-sidebar-hover">
                                                <FileBadge2 />
                                                <span>Garantias</span>
                                            </router-link>
                                            <router-link to="/patrimonio/categorias"
                                                class="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-sidebar-hover">
                                                <FileStack />
                                                <span>Tipos</span>
                                            </router-link>
                                        </div>
                                    </collapsible-content>
                                </collapsible>
                            </div>
                        </collapsible-content>
                    </collapsible>
                    <collapsible v-slot="{ open }" class="grid gap-2">
                        <collapsible-trigger
                            class="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-sidebar-hover">
                            <PenTool />
                            <span>Assinantes</span>
                            <div class="ml-auto flex space-x-1 items-center">
                                <Badge v-if="true" variant="destructive"> {{ stateDevelopment }} </Badge>
                                <ChevronRight class="ml-auto h-4 w-4 transition-transform"
                                    :class="{ 'rotate-90': open }" />
                            </div>
                        </collapsible-trigger>
                        <collapsible-content>
                            <div class="grid gap-2 pl-6">
                                <router-link to="/patrimonio/categorias"
                                    class="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-sidebar-hover">
                                    <FileChartPie />
                                    <span>Resumo</span>
                                </router-link>
                                <router-link to="/patrimonio/produtos"
                                    class="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-sidebar-hover">
                                    <Ticket />
                                    <span>Assinaturas</span>
                                </router-link>
                                <router-link to="/patrimonio/produtos"
                                    class="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-sidebar-hover">
                                    <BadgeCheck />
                                    <span>Planos</span>
                                </router-link>
                                <router-link to="/patrimonio/servicos"
                                    class="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-sidebar-hover">
                                    <CalendarX2 />
                                    <span>Vencimentos</span>
                                </router-link>
                            </div>
                        </collapsible-content>
                    </collapsible>
                </nav>
            </div>
            <div class="pb-4 px-3 bg-sidebar">
                <div @click="LoginService.logout()"
                    class="flex text-white cursor-pointer items-center gap-2 rounded-md px-3 py-2 text-sm font-bold transition-colors hover:bg-sidebar-hover">
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
import { House, LockKeyhole, Users, List, Wallet, ChevronRight, LogOut, PanelLeftOpen, PanelLeftClose, Landmark, FileText, Package, Boxes, Group, Computer, Tags, BookOpenCheck, BadgeCheck, CalendarX2, FileChartPie, Settings2, PenTool, ClipboardCheck, Ticket, FileDigit, Archive, FileBadge2, FileStack, FileCheck, Layers, User, Contact, WalletMinimal, CircleDollarSign } from 'lucide-vue-next'
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible"
import { BreadCrumb, ProfileHome, ToogleMode } from '.';
import { LoginService } from '@/services/login/loginService';
import { onMounted } from 'vue';
import { onUnmounted } from 'vue';
import { Badge } from '@/components/ui/badge';

const widthWindow = ref(window.innerWidth);
const stateDevelopment = ref('beta');

const handleResize = () => {
    widthWindow.value = window.innerWidth;
    isSidebarOpen.value = widthWindow.value > 1024;
};
onMounted(() => {
    window.addEventListener('resize', handleResize);
    handleResize(); // Para verificar o estado inicial
});
onUnmounted(() => {
    window.removeEventListener('resize', handleResize);
});

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