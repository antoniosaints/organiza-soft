<script setup lang="ts">
import Tabs from '@/components/ui/tabs/Tabs.vue';
import TabsContent from '@/components/ui/tabs/TabsContent.vue';
import TabsList from '@/components/ui/tabs/TabsList.vue';
import TabsTrigger from '@/components/ui/tabs/TabsTrigger.vue';
import { useLoginStore } from '@/stores/login/loginStore';
import { useMenuStore } from '@/stores/menuStore';
import { ChartColumnBig, ChartPie, CircleDollarSign, SquareChartGantt } from 'lucide-vue-next';

const loginStore = useLoginStore()
const menuStore = useMenuStore()
</script>
<template>
    <Tabs default-value="general">
        <div class="flex justify-between items-center flex-col md:flex-row">
            <slot name="title"></slot>
            <TabsList>
                <TabsTrigger value="general">
                    <div class="flex items-center">
                        <ChartPie class="mr-2 w-4 h-4" />
                        Geral
                    </div>
                </TabsTrigger>
                <TabsTrigger v-show="menuStore.permissions.dashboardPatrimonio" :disabled="!loginStore.isProAccount"
                    value="patrimonio">
                    <div class="flex items-center">
                        <SquareChartGantt class="mr-2 w-4 h-4" />
                        Patrimonio {{ !loginStore.isProAccount ? '(Pro)' : '' }}
                    </div>
                </TabsTrigger>
                <TabsTrigger v-show="menuStore.permissions.dashboardFinanceiro" :disabled="!loginStore.isProAccount"
                    value="financeiro">
                    <div class="flex items-center">
                        <CircleDollarSign class="mr-2 w-4 h-4" />
                        Financeiro {{ !loginStore.isProAccount ? '(Pro)' : '' }}
                    </div>
                </TabsTrigger>
                <TabsTrigger v-show="menuStore.permissions.dashboardVendas" :disabled="!loginStore.isProAccount"
                    value="vendas">
                    <div class="flex items-center">
                        <ChartColumnBig class="mr-2 w-4 h-4" />
                        Vendas {{ !loginStore.isProAccount ? '(Pro)' : '' }}
                    </div>
                </TabsTrigger>
            </TabsList>
        </div>
        <TabsContent value="general">
            <slot name="general"></slot>
        </TabsContent>
        <TabsContent value="financeiro">
            <slot name="financeiro"></slot>
        </TabsContent>
        <TabsContent value="patrimonio">
            <slot name="patrimonio"></slot>
        </TabsContent>
        <TabsContent value="vendas">
            <slot name="vendas"></slot>
        </TabsContent>
    </Tabs>
</template>