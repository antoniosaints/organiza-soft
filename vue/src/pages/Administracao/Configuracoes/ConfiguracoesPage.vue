<script setup lang="ts">
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AtSign, Cog, Link } from 'lucide-vue-next';
import ConfiguracoesGerais from './ConfiguracoesGerais.vue';
import ConfiguracoesIntegracoes from './ConfiguracoesIntegracoes.vue';
import { ref } from 'vue';
import ConfiguracoesEmail from './ConfiguracoesEmail.vue';

const activeTab = ref('general');
const tabsConfigurationsStatus = {
    general: true,
    integrations: true,
    emails: false
}
</script>

<template>
    <div class="mx-auto max-w-7xl">
        <h1 class="text-3xl font-bold mb-6">Configurações do sistema</h1>
        <Tabs :default-value="activeTab" class="">
            <TabsList class="grid grid-cols-3 w-max md:w-[400px]">
                <TabsTrigger :disabled="!tabsConfigurationsStatus.general" value="general">
                    <div class="flex items-center">
                        <Cog class="mr-1 w-4 h-4" />
                        Geral
                    </div>
                </TabsTrigger>
                <TabsTrigger :disabled="!tabsConfigurationsStatus.integrations" value="integrations">
                    <div class="flex items-center">
                        <Link class="mr-1 w-4 h-4" />
                        Integrações
                    </div>
                </TabsTrigger>
                <TabsTrigger :disabled="!tabsConfigurationsStatus.emails" value="emails">
                    <div class="flex items-center">
                        <AtSign class="mr-1 w-4 h-4" />
                        E-mail
                    </div>
                </TabsTrigger>
            </TabsList>
            <TabsContent value="general">
                <ConfiguracoesGerais />
            </TabsContent>
            <TabsContent value="integrations">
                <ConfiguracoesIntegracoes />
            </TabsContent>
            <TabsContent value="emails">
                <ConfiguracoesEmail />
            </TabsContent>
        </Tabs>
    </div>
</template>