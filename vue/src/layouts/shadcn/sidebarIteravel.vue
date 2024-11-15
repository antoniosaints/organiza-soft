<script setup lang="ts">
import { Skeleton } from '@/components/ui/skeleton';
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible"
import { useMenuStore } from '@/stores/menuStore';
import { BadgeCheck, BookOpenCheck, ChevronRight, ClipboardCheck, Computer, Contact, FileBox, FileChartPie, FileCheck, FileDigit, FileText, Handshake, History, House, KeyRound, Landmark, Layers, List, LockKeyhole, MessageCircle, Package, PenTool, Settings2, Sparkles, Tags, Ticket, User, UserRoundCog, Wallet } from 'lucide-vue-next';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
const menuStore = useMenuStore()

interface IMenuOptionsSidebar {
    title: string;
    url?: string;
    show: boolean;
    icon: any;
    items?: IMenuOptionsSidebar[];
    secondaryIcon?: any;
}

const MenuOptionsSidebar: IMenuOptionsSidebar[] = [
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
        icon: Handshake,
        title: "RH",
        show: menuStore.permissions.rh,
        items: [
            {
                icon: UserRoundCog,
                title: "Funcionários",
                show: menuStore.permissions.admin,
                url: "/app/rh/funcionarios"
            },
            {
                icon: History,
                title: "Horas extras",
                show: menuStore.permissions.admin,
                url: "/app/rh/horasextras"
            }
        ]
    },
    {
        title: t("sidebar.assistant"),
        icon: Sparkles,
        secondaryIcon: Skeleton,
        show: menuStore.permissions.assistente,
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
                show: menuStore.permissions.crm && menuStore.permissions.dashboardCrm
            },
            {
                icon: User,
                title: t("sidebar.clients"),
                url: "/app/crm/clientes",
                show: menuStore.permissions.crm
            },
            {
                icon: Settings2,
                title: t("sidebar.others"),
                show: menuStore.permissions.crm,
                items: [
                    {
                        title: 'Tipos',
                        icon: Contact,
                        url: "/app/patrimonio/categorias",
                        show: menuStore.permissions.crm
                    }
                ]
            },
        ]
    },
    {
        title: 'Vendas',
        icon: Tags,
        show: menuStore.permissions.vendas,
        items: [
            {
                title: "Resumo",
                icon: FileChartPie,
                show: menuStore.permissions.vendas && menuStore.permissions.dashboardVendas,
                url: "/app/patrimonio/categorias"
            },
            {
                title: "PDV",
                icon: Computer,
                show: menuStore.permissions.vendas,
                url: "/app/vendas/pdv"
            },
            {
                title: "Registros",
                icon: ClipboardCheck,
                show: menuStore.permissions.vendas,
                url: "/app/vendas/relatorio"
            },
        ]
    },
    {
        title: "Financeiro",
        icon: Landmark,
        show: menuStore.permissions.financeiro,
        items: [
            {
                title: "Resumo",
                icon: FileChartPie,
                show: menuStore.permissions.financeiro && menuStore.permissions.dashboardFinanceiro,
                url: "/app/financeiro/dashboard"
            },
            {
                icon: Wallet,
                title: 'Lançamentos',
                show: menuStore.permissions.financeiro,
                url: "/app/financeiro/lancamentos"
            },
            {
                icon: FileText,
                title: 'DRE',
                show: menuStore.permissions.financeiro && false,
                url: "/app/financeiro/dre"
            },
            {
                icon: Settings2,
                title: t("sidebar.others"),
                show: menuStore.permissions.financeiro && false,
                items: [
                    {
                        title: 'Categorias',
                        icon: Contact,
                        url: "/app/financeiro/categorias",
                        show: menuStore.permissions.financeiro
                    }
                ]
            }

        ]
    },
    {
        title: "Patrimônio",
        icon: Package,
        show: menuStore.permissions.patrimonio,
        items: [
            {
                title: "Resumo",
                icon: FileChartPie,
                show: menuStore.permissions.patrimonio && menuStore.permissions.dashboardPatrimonio,
                url: "/app/patrimonio/dashboard"
            },
            {
                icon: FileBox,
                title: 'Produtos',
                show: menuStore.permissions.patrimonio,
                url: "/app/patrimonio/produtos"
            }
        ]
    },
    {
        title: "Serviços",
        icon: FileDigit,
        show: menuStore.permissions.servicos,
        items: [
            {
                icon: BookOpenCheck,
                title: 'Ordens de Serviço',
                show: menuStore.permissions.servicos,
                url: "/app/servicos/os"
            },
            {
                icon: FileCheck,
                title: 'Serviços',
                show: menuStore.permissions.servicos,
                url: "/app/servicos/servicos"
            },
        ]
    },
    {
        title: "Assinantes",
        icon: PenTool,
        show: menuStore.permissions.assinantes,
        items: [
            {
                icon: Ticket,
                title: 'Assinaturas',
                show: menuStore.permissions.assinantes,
                url: "/app/assinantes/assinaturas"
            },
            {
                icon: BadgeCheck,
                title: 'Planos',
                show: menuStore.permissions.assinantes,
                url: "/app/assinantes/planos"
            },
        ]
    }
]

</script>

<template>
    <div class="flex-1 overflow-y-auto bg-sidebar text-white px-2 py-4">
        <nav class="grid gap-2">
            <collapsible v-for="(item, index) in MenuOptionsSidebar" :key="index" v-show="item.show" :title="item.title"
                v-slot="{ open }" class="grid gap-2">
                <router-link v-if="!item?.items?.length" :to="item.url!"
                    class="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-sidebar-hover">
                    <component :is="item.icon" />
                    <span>{{ item.title }}</span>
                </router-link>
                <collapsible-trigger v-else
                    class="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-sidebar-hover">
                    <component :is="item.icon" />
                    <span>{{ item.title }}</span>
                    <div class="ml-auto flex space-x-1 items-center">
                        <component v-if="item.secondaryIcon" :is="item.secondaryIcon"
                            class="bg-blue-500 rounded-full h-3 w-3 shadow-none" />
                        <ChevronRight class="ml-auto h-4 w-4 transition-transform" :class="{ 'rotate-90': open }" />
                    </div>
                </collapsible-trigger>
                <collapsible-content>
                    <div class="grid gap-2 pl-6">
                        <div v-for="(subItem, index) in item.items" :key="index" v-show="subItem.show">
                            <router-link v-if="!subItem?.items?.length" :to="subItem.url!"
                                class="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-sidebar-hover">
                                <component :is="subItem.icon" />
                                <span>{{ subItem.title }}</span>
                            </router-link>
                            <collapsible v-else v-slot="{ open }" class="grid gap-2">
                                <collapsible-trigger
                                    class="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-sidebar-hover">
                                    <component :is="subItem.icon" />
                                    <span>{{ subItem.title }}</span>
                                    <ChevronRight class="ml-auto h-4 w-4 transition-transform"
                                        :class="{ 'rotate-90': open }" />
                                </collapsible-trigger>
                                <collapsible-content>
                                    <div class="grid gap-2 pl-6">
                                        <div v-for="(terceiro, index) in subItem.items" :key="index" v-show="terceiro.show">
                                            <router-link :to="terceiro.url!"
                                                class="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-sidebar-hover">
                                                <component :is="terceiro.icon" />
                                                <span>{{ terceiro.title }}</span>
                                            </router-link>
                                        </div>
                                    </div>
                                </collapsible-content>
                            </collapsible>
                        </div>
                    </div>
                </collapsible-content>
            </collapsible>
        </nav>
    </div>
</template>