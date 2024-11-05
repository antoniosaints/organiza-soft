<script setup lang="ts">
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible"
import { useLoginStore } from '@/stores/login/loginStore';
import { useMenuStore } from '@/stores/menuStore';
import { ref } from 'vue';
import { Archive, BadgeCheck, BookOpenCheck, Boxes, CalendarX2, ChevronRight, CircleDollarSign, ClipboardCheck, Computer, Contact, Cpu, FileBadge2, FileChartPie, FileCheck, FileDigit, FileStack, FileText, Group, House, KeyRound, Landmark, Layers, List, LockKeyhole, MessageCircle, Package, PenTool, Settings2, Tags, Ticket, User, Users, Wallet, WalletMinimal } from 'lucide-vue-next';
import { useI18n } from 'vue-i18n';

const menuStore = useMenuStore()
const loginStore = useLoginStore()
const stateDevelopment = ref('beta');
const { t } = useI18n();
</script>

<template>
    <div class="flex-1 overflow-y-auto bg-sidebar text-white px-2 py-4">
        <nav class="grid gap-2">
            <router-link to="/app/dashboard"
                class="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-sidebar-hover">
                <House />
                <span>{{ t("sidebar.home") }}</span>
            </router-link>
            <collapsible v-if="menuStore.permissions.admin" v-slot="{ open }" class="grid gap-2">
                <collapsible-trigger
                    class="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-sidebar-hover">
                    <LockKeyhole />
                    <span>{{ t("sidebar.admin") }}</span>
                    <ChevronRight class="ml-auto h-4 w-4 transition-transform" :class="{ 'rotate-90': open }" />
                </collapsible-trigger>
                <collapsible-content>
                    <div class="grid gap-2 pl-6">
                        <router-link to="/app/administracao/usuarios"
                            class="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-sidebar-hover">
                            <Users />
                            <span>{{ t("sidebar.users") }}</span>
                        </router-link>
                        <router-link to="/app/assinatura"
                            class="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-sidebar-hover">
                            <KeyRound />
                            <span>{{ t("sidebar.subscription") }}</span>
                            <div class="ml-auto flex space-x-1 items-center">
                                <Badge :class="loginStore.isProAccount ? 'bg-orange-400 text-black' : 'bg-gray-500'"> {{
                                    loginStore.isProAccount ? 'Pro' : 'Free' }} </Badge>
                            </div>
                        </router-link>
                        <router-link to="/app/administracao/logs"
                            class="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-sidebar-hover">
                            <List />
                            <span>{{ t("sidebar.logs") }}</span>
                        </router-link>
                    </div>
                </collapsible-content>
            </collapsible>
            <collapsible v-if="menuStore.permissions.assistente" v-slot="{ open }" class="grid gap-2">
                <collapsible-trigger
                    class="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-sidebar-hover">
                    <Cpu />
                    <span>{{ t("sidebar.assistant") }}</span>
                    <div class="ml-auto flex space-x-1 items-center">
                        <Skeleton v-if="true" class="bg-blue-500 rounded-full h-3 w-3 shadow-none" />
                        <ChevronRight class="ml-auto h-4 w-4 transition-transform" :class="{ 'rotate-90': open }" />
                    </div>
                </collapsible-trigger>
                <collapsible-content>
                    <div class="grid gap-2 pl-6">
                        <router-link to="/app/agentesia/playground"
                            class="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-sidebar-hover">
                            <MessageCircle />
                            <span>{{ t("sidebar.playground") }} ✨</span>
                        </router-link>
                    </div>
                </collapsible-content>
            </collapsible>
            <collapsible v-if="menuStore.permissions.crm" v-slot="{ open }" class="grid gap-2">
                <collapsible-trigger
                    class="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-sidebar-hover">
                    <Layers />
                    <span>{{ t("sidebar.crm") }}</span>
                    <div class="ml-auto flex space-x-1 items-center">
                        <Badge v-if="true" variant="destructive"> {{ stateDevelopment }} </Badge>
                        <ChevronRight class="ml-auto h-4 w-4 transition-transform" :class="{ 'rotate-90': open }" />
                    </div>
                </collapsible-trigger>
                <collapsible-content>
                    <div class="grid gap-2 pl-6">
                        <router-link to="/app/patrimonio/categorias"
                            class="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-sidebar-hover">
                            <FileChartPie />
                            <span>{{ t("sidebar.resumecrm") }}</span>
                        </router-link>
                        <router-link to="/app/crm/clientes"
                            class="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-sidebar-hover">
                            <User />
                            <span>{{ t("sidebar.clients") }}</span>
                        </router-link>
                        <router-link to="/app/vendas/pdv"
                            class="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-sidebar-hover">
                            <ClipboardCheck />
                            <span>{{ t("sidebar.reportClients") }}</span>
                        </router-link>
                        <collapsible v-slot="{ open }" class="grid gap-2">
                            <collapsible-trigger
                                class="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-sidebar-hover">
                                <Settings2 />
                                <span>{{ t("sidebar.others") }}</span>
                                <ChevronRight class="ml-auto h-4 w-4 transition-transform"
                                    :class="{ 'rotate-90': open }" />
                            </collapsible-trigger>
                            <collapsible-content>
                                <div class="grid gap-2 pl-6">
                                    <router-link to="/app/patrimonio/categorias"
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
            <collapsible v-if="menuStore.permissions.vendas" v-slot="{ open }" class="grid gap-2">
                <collapsible-trigger
                    class="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-sidebar-hover">
                    <Tags />
                    <span>Vendas</span>
                    <div class="ml-auto flex space-x-1 items-center">
                        <Badge v-if="true" variant="destructive"> {{ stateDevelopment }} </Badge>
                        <ChevronRight class="ml-auto h-4 w-4 transition-transform" :class="{ 'rotate-90': open }" />
                    </div>
                </collapsible-trigger>
                <collapsible-content>
                    <div class="grid gap-2 pl-6">
                        <router-link to="/app/patrimonio/categorias"
                            class="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-sidebar-hover">
                            <FileChartPie />
                            <span>Resumo</span>
                        </router-link>
                        <router-link to="/app/vendas/pdv"
                            class="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-sidebar-hover">
                            <Computer />
                            <span>PDV</span>
                        </router-link>
                        <router-link to="/app/vendas/relatorio"
                            class="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-sidebar-hover">
                            <ClipboardCheck />
                            <span>Relatórios</span>
                        </router-link>
                    </div>
                </collapsible-content>
            </collapsible>
            <collapsible v-if="menuStore.permissions.financeiro" v-slot="{ open }" class="grid gap-2">
                <collapsible-trigger
                    class="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-sidebar-hover">
                    <Landmark />
                    <span>Financeiro</span>
                    <div class="ml-auto flex space-x-1 items-center">
                        <Badge v-if="true" variant="destructive"> {{ stateDevelopment }} </Badge>
                        <ChevronRight class="ml-auto h-4 w-4 transition-transform" :class="{ 'rotate-90': open }" />
                    </div>
                </collapsible-trigger>
                <collapsible-content>
                    <div class="grid gap-2 pl-6">
                        <router-link to="/app/patrimonio/categorias"
                            class="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-sidebar-hover">
                            <FileChartPie />
                            <span>Resumo</span>
                        </router-link>
                        <router-link to="/app/financeiro/lancamentos"
                            class="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-sidebar-hover">
                            <Wallet />
                            <span>Lançamentos</span>
                        </router-link>
                        <router-link to="/app/financeiro/dre"
                            class="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-sidebar-hover">
                            <FileText />
                            <span>DRE</span>
                        </router-link>
                        <collapsible v-slot="{ open }" class="grid gap-2">
                            <collapsible-trigger
                                class="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-sidebar-hover">
                                <Settings2 />
                                <span>{{ t("sidebar.others") }}</span>
                                <ChevronRight class="ml-auto h-4 w-4 transition-transform"
                                    :class="{ 'rotate-90': open }" />
                            </collapsible-trigger>
                            <collapsible-content>
                                <div class="grid gap-2 pl-6">
                                    <router-link to="/app/financeiro/dre"
                                        class="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-sidebar-hover">
                                        <WalletMinimal />
                                        <span>Contas</span>
                                    </router-link>
                                    <router-link to="/app/financeiro/dre"
                                        class="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-sidebar-hover">
                                        <CircleDollarSign />
                                        <span>Formas pg.</span>
                                    </router-link>
                                    <router-link to="/app/financeiro/dre"
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
            <collapsible v-if="menuStore.permissions.patrimonio" v-slot="{ open }" class="grid gap-2">
                <collapsible-trigger
                    class="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-sidebar-hover">
                    <Package />
                    <span>Patrimônio</span>
                    <div class="ml-auto flex space-x-1 items-center">
                        <Badge v-if="true" variant="destructive"> {{ stateDevelopment }} </Badge>
                        <ChevronRight class="ml-auto h-4 w-4 transition-transform" :class="{ 'rotate-90': open }" />
                    </div>
                </collapsible-trigger>
                <collapsible-content>
                    <div class="grid gap-2 pl-6">
                        <router-link to="/app/patrimonio/categorias"
                            class="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-sidebar-hover">
                            <FileChartPie />
                            <span>Resumo</span>
                        </router-link>
                        <router-link to="/app/patrimonio/produtos"
                            class="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-sidebar-hover">
                            <Archive />
                            <span>Produtos</span>
                        </router-link>
                        <router-link to="/app/patrimonio/estoques"
                            class="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-sidebar-hover">
                            <Boxes />
                            <span>Estoques</span>
                        </router-link>
                        <collapsible v-slot="{ open }" class="grid gap-2">
                            <collapsible-trigger
                                class="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-sidebar-hover">
                                <Settings2 />
                                <span>{{ t("sidebar.others") }}</span>
                                <ChevronRight class="ml-auto h-4 w-4 transition-transform"
                                    :class="{ 'rotate-90': open }" />
                            </collapsible-trigger>
                            <collapsible-content>
                                <div class="grid gap-2 pl-6">
                                    <router-link to="/app/patrimonio/categorias"
                                        class="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-sidebar-hover">
                                        <Group />
                                        <span>Categorias</span>
                                    </router-link>
                                    <router-link to="/app/patrimonio/fornecedores"
                                        class="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-sidebar-hover">
                                        <User />
                                        <span>Fornecedores</span>
                                    </router-link>
                                </div>
                            </collapsible-content>
                        </collapsible>
                    </div>
                </collapsible-content>
            </collapsible>
            <collapsible v-if="menuStore.permissions.servicos" v-slot="{ open }" class="grid gap-2">
                <collapsible-trigger
                    class="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-sidebar-hover">
                    <FileDigit />
                    <span>Serviços</span>
                    <div class="ml-auto flex space-x-1 items-center">
                        <Badge v-if="true" variant="destructive"> {{ stateDevelopment }} </Badge>
                        <ChevronRight class="ml-auto h-4 w-4 transition-transform" :class="{ 'rotate-90': open }" />
                    </div>
                </collapsible-trigger>
                <collapsible-content>
                    <div class="grid gap-2 pl-6">
                        <router-link to="/app/patrimonio/categorias"
                            class="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-sidebar-hover">
                            <FileChartPie />
                            <span>Resumo</span>
                        </router-link>
                        <router-link to="/app/patrimonio/servicos"
                            class="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-sidebar-hover">
                            <BookOpenCheck />
                            <span>Ordens de Serviço</span>
                        </router-link>
                        <router-link to="/app/patrimonio/servicos"
                            class="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-sidebar-hover">
                            <FileCheck />
                            <span>Serviços</span>
                        </router-link>
                        <collapsible v-slot="{ open }" class="grid gap-2">
                            <collapsible-trigger
                                class="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-sidebar-hover">
                                <Settings2 />
                                <span>{{ t("sidebar.others") }}</span>
                                <ChevronRight class="ml-auto h-4 w-4 transition-transform"
                                    :class="{ 'rotate-90': open }" />
                            </collapsible-trigger>
                            <collapsible-content>
                                <div class="grid gap-2 pl-6">
                                    <router-link to="/app/patrimonio/categorias"
                                        class="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-sidebar-hover">
                                        <FileBadge2 />
                                        <span>Garantias</span>
                                    </router-link>
                                    <router-link to="/app/patrimonio/categorias"
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
            <collapsible v-if="menuStore.permissions.assinantes" v-slot="{ open }" class="grid gap-2">
                <collapsible-trigger
                    class="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-sidebar-hover">
                    <PenTool />
                    <span>Assinantes</span>
                    <div class="ml-auto flex space-x-1 items-center">
                        <Badge v-if="true" variant="destructive"> {{ stateDevelopment }} </Badge>
                        <ChevronRight class="ml-auto h-4 w-4 transition-transform" :class="{ 'rotate-90': open }" />
                    </div>
                </collapsible-trigger>
                <collapsible-content>
                    <div class="grid gap-2 pl-6">
                        <router-link to="/app/patrimonio/categorias"
                            class="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-sidebar-hover">
                            <FileChartPie />
                            <span>Resumo</span>
                        </router-link>
                        <router-link to="/app/patrimonio/produtos"
                            class="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-sidebar-hover">
                            <Ticket />
                            <span>Assinaturas</span>
                        </router-link>
                        <router-link to="/app/patrimonio/produtos"
                            class="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-sidebar-hover">
                            <BadgeCheck />
                            <span>Planos</span>
                        </router-link>
                        <router-link to="/app/patrimonio/servicos"
                            class="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-sidebar-hover">
                            <CalendarX2 />
                            <span>Vencimentos</span>
                        </router-link>
                    </div>
                </collapsible-content>
            </collapsible>
        </nav>
    </div>
</template>