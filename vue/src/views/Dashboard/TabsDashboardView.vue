<script setup lang="ts">
import Tabs from '@/components/ui/tabs/Tabs.vue';
import TabsContent from '@/components/ui/tabs/TabsContent.vue';
import TabsList from '@/components/ui/tabs/TabsList.vue';
import TabsTrigger from '@/components/ui/tabs/TabsTrigger.vue';
</script>
<template>
    <Tabs default-value="general">
        <div class="flex justify-between items-center flex-col md:flex-row">
            <slot name="title"></slot>
            <TabsList class="grid grid-cols-3">
                <TabsTrigger value="general">
                    Geral
                </TabsTrigger>
                <TabsTrigger value="estoque">
                    Estoque
                </TabsTrigger>
                <TabsTrigger value="vendas">
                    Vendas
                </TabsTrigger>
            </TabsList>
        </div>
        <TabsContent value="general">
           <slot name="general"></slot>
        </TabsContent>
        <TabsContent value="estoque">
           <slot name="estoque"></slot>
        </TabsContent>
        <TabsContent value="vendas">
           <slot name="vendas"></slot>
        </TabsContent>
    </Tabs>
</template>