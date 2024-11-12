<script setup lang="ts">
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { IBalanco } from '@/types/financeiro/IResumoFinanceiro';
import { formatRealValue } from '@/utils/formatterUtil';

defineProps<{
    contas: IBalanco[]
}>()
</script>
<template>
    <ScrollArea>
        <div class="flex flex-col gap-2">
            <Card class="bg-background" v-for="item in contas" :key="item.name">
                <CardContent class="p-4 flex justify-between items-center">
                    <div>
                        <h3 class="font-semibold">{{ item.name }}</h3>
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