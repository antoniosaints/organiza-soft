<template>
    <div class="flex min-h-screen w-full bg-background text-foreground">
        <aside :class="sidebarClasses">
            <div class="flex border-white/10 border-b items-center bg-sidebar justify-between text-white p-2">
                <div class="flex w-full items-center">
                    <!-- <img src="/OS.png" alt="logo" class="h-8 w-8 rounded-full">
                    <span class="text-xl">Organiza Soft</span> -->
                    <SelectConta />
                </div>
                <button type="button" class="lg:hidden" @click="toggleSidebar">
                    <PanelLeftClose />
                </button>
            </div>
             <SidebarIteravel />
            <div class="mt-auto px-3 py-4 bg-sidebar">
                <Card v-if="!loginStore.isProAccount && loginStore.isAdminUser">
                    <CardHeader class="text-center">
                        <CardTitle>OrganizaSoft PRO ✨</CardTitle>
                        <CardDescription>
                            Acesse tudo de forma ilimitada, assine agora!
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <RouterLink to="/app/assinatura">
                            <Button size="sm" class="w-full">
                                Assinar PRO 🎯
                            </Button>
                        </RouterLink>
                    </CardContent>
                </Card>
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
                    <ComandoBusca />
                    <ToogleMode />
                    <ProfileHome />
                </div>
            </header>
            <main class="p-4 lg:p-6 max-w-7xl mx-auto">
                <GlobalAlert class="mb-2" />
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
import { LogOut, PanelLeftOpen, PanelLeftClose } from 'lucide-vue-next'
import { BreadCrumb, ProfileHome, ToogleMode } from '.';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LoginService } from '@/services/login/loginService';
import { onMounted } from 'vue';
import { onUnmounted } from 'vue';
import { useLoginStore } from '@/stores/login/loginStore';
import GlobalAlert from './globalAlert.vue';
import SidebarIteravel from './sidebarIteravel.vue';
import ComandoBusca from '@/pages/ComandoBusca/ComandoBusca.vue';
import SelectConta from './selectConta.vue';
import { Router } from '@/routes/Router';

const widthWindow = ref(window.innerWidth);
const loginStore = useLoginStore();

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
    return `fixed inset-y-0 left-0 z-20 flex w-full sm:w-64 flex-col border-r border-border bg-background
      transition-all duration-300 ${isSidebarOpen.value ? 'translate-x-0' : '-translate-x-full'}`;
});

Router.beforeEach(() => {
    isSidebarOpen.value = window.innerWidth <= 768 ? false : true;
})
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