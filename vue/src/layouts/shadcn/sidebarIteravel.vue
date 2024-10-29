<script setup lang="ts">
import { Skeleton } from '@/components/ui/skeleton';
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible"
import { useLoginStore } from '@/stores/login/loginStore';
import { useMenuStore } from '@/stores/menuStore';
import { ref } from 'vue';
import { Archive, BadgeCheck, BookOpenCheck, Boxes, CalendarX2, ChevronRight, CircleDollarSign, ClipboardCheck, Computer, Contact, Cpu, FileBadge2, FileChartPie, FileCheck, FileDigit, FileStack, FileText, Group, House, KeyRound, Landmark, Layers, List, LockKeyhole, MessageCircle, Package, PenTool, Settings2, Tags, Ticket, User, Users, Wallet, WalletMinimal } from 'lucide-vue-next';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
const menuStore = useMenuStore()
const loginStore = useLoginStore()

interface IMenuOptionsSidebar {
    title: string;
    url?: string;
    show: boolean;
    icon: any;
    secondaryIcon?: any;
}

export interface IMenuOptions extends IMenuOptionsSidebar {
    items?: IMenuOptionsSidebar[];
}

const MenuOptionsSidebar: IMenuOptions[] = [
    {
        icon: House,
        show: true,
        title: t("sidebar.home"),
        url: "/app/dashboard"
    },
    {
        icon: LockKeyhole,
        show: menuStore.permissions.admin,
        title: t("sidebar.admin"),
        items: [
            {
                icon: User,
                title: t("sidebar.users"),
                url: "/app/administracao/usuarios",
                show: menuStore.permissions.admin
            },
            {
                icon: KeyRound,
                title: t("sidebar.subscription"),
                url: "/app/assinatura",
                show: menuStore.permissions.admin
            },
            {
                icon: List,
                title: t("sidebar.logs"),
                url: "/app/administracao/logs",
                show: menuStore.permissions.admin
            }
        ]
    },
    {
        title: t("sidebar.assistant"),
        icon: Cpu,
        secondaryIcon: Skeleton,
        show: true,
        items: [
            {
                url: "/app/agentesia/playground",
                icon: MessageCircle,
                title: `${t("sidebar.playground")} ✨`,
                show: menuStore.permissions.assistente
            }
        ] 
    },
    {
        title: t("sidebar.crm"),
        show: menuStore.permissions.crm,
        icon: Layers,
        items: [
            {
                icon: FileChartPie,
                title: t("sidebar.resumecrm"),
                url: "/app/crm/clientes",
                show: menuStore.permissions.crm
            },
            {
                icon: User,
                title: t("sidebar.clients"),
                url: "/app/crm/clientes",
                show: menuStore.permissions.crm
            },
        ]
    }
]

</script>

<template>
    <div class="flex-1 overflow-y-auto bg-sidebar text-white px-2 py-4">
        <nav class="grid gap-2">
            <collapsible v-for="(item, index) in MenuOptionsSidebar" :key="index" v-show="item.show" :title="t(item.title)" v-slot="{ open }" class="grid gap-2">
                <router-link v-if="!item?.items?.length" :to="item.url!"
                    class="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-sidebar-hover">
                    <component :is="item.icon" />
                    <span>{{ item.title }}</span>
                </router-link>
                <collapsible-trigger
                    v-else
                    class="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-sidebar-hover">
                    <component :is="item.icon" />
                    <span>{{ item.title }}</span>
                    <div class="ml-auto flex space-x-1 items-center">
                        <component v-if="item.secondaryIcon" :is="item.secondaryIcon" class="bg-blue-500 rounded-full h-3 w-3 shadow-none" />
                        <ChevronRight class="ml-auto h-4 w-4 transition-transform" :class="{ 'rotate-90': open }" />
                    </div>
                </collapsible-trigger>
                <collapsible-content>
                    <div class="grid gap-2 pl-6">
                        <router-link v-for="(subItem, index) in item.items" :key="index" :to="subItem.url!"
                            class="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-sidebar-hover">
                            <component :is="subItem.icon" />
                            <span>{{ subItem.title }}</span>
                        </router-link>
                    </div>
                </collapsible-content>
            </collapsible>
        </nav>
    </div>
</template>