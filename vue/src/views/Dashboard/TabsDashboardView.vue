<script setup lang="ts">
import Tabs from '@/components/ui/tabs/Tabs.vue';
import TabsContent from '@/components/ui/tabs/TabsContent.vue';
import TabsList from '@/components/ui/tabs/TabsList.vue';
import TabsTrigger from '@/components/ui/tabs/TabsTrigger.vue';
import { useLoginStore } from '@/stores/login/loginStore';
import { useMenuStore } from '@/stores/menuStore';

const loginStore = useLoginStore()
const menuStore = useMenuStore()
</script>
<template>
    <Tabs default-value="general">
        <div class="flex justify-between items-center flex-col md:flex-row">
            <slot name="title"></slot>
            <TabsList>
                <TabsTrigger value="general">
                    Geral
                </TabsTrigger>
                <TabsTrigger v-show="menuStore.permissions.dashboardPatrimonio" :disabled="!loginStore.isProAccount" value="patrimonio">
                    Patrimonio {{ !loginStore.isProAccount ? '(Pro)' : '' }}
                </TabsTrigger>
                <TabsTrigger v-show="menuStore.permissions.dashboardFinanceiro" :disabled="!loginStore.isProAccount" value="financeiro">
                    Financeiro {{ !loginStore.isProAccount ? '(Pro)' : '' }}
                </TabsTrigger>
                <TabsTrigger v-show="menuStore.permissions.dashboardVendas" :disabled="!loginStore.isProAccount" value="vendas">
                    Vendas {{ !loginStore.isProAccount ? '(Pro)' : '' }}
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