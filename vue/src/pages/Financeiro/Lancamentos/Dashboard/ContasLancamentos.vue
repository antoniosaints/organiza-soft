<script setup lang="ts">
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { IBalanco } from '@/types/financeiro/IResumoFinanceiro';
import { formatRealValue } from '@/utils/formatterUtil';
import { WalletMinimal } from 'lucide-vue-next';
import ContasModal from '../../Contas/Modais/ContasModal.vue';

defineProps<{
    contas: IBalanco[]
}>()
</script>
<template>
    <ScrollArea>
        <ContasModal />
        <div class="flex flex-col gap-2">
            <Card class="bg-background" v-for="item in contas" :key="item.name">
                <CardContent class="py-2 relative flex justify-between items-center">
                    <div class="absolute left-0 top-0 p-2 bg-purple-500 h-full rounded-l-md">
                    </div>
                    <div>
                        <div class="flex items-center gap-2 transition hover:text-purple-500">
                            <WalletMinimal class="w-5 h-5 hover:animate-pulse" />
                            <h3 class="font-semibold">{{ item.name }}</h3>
                        </div>
                        <p class="text-sm text-green-500">Receita: {{ formatRealValue(item.receita) }}</p>
                        <p class="text-sm text-red-500">Despesa: {{ formatRealValue(item.despesa) }}</p>
                    </div>
                    <div class="flex items-center">
                        <span class="font-semibold">{{ formatRealValue(item.receita - item.despesa) }}</span>
                    </div>
                </CardContent>
            </Card>
        </div>
    </ScrollArea>
</template>