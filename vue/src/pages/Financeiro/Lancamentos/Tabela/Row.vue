<template>
    <TableRow :class="{ 'bg-primary/40 hover:bg-primary/30': hasSelected }" class="transition-colors">
        <TableCell>
            <Checkbox :checked="hasSelected" @click="mainStore.handleSelectItens(data.id as number)" />
        </TableCell>
        <TableCell>
            <BadgeNatureza :natureza="data.natureza" />
        </TableCell>
        <TableCell>
            <TooltipProvider>
                <Tooltip :delay-duration="800">
                    <TooltipTrigger as-child>
                        <Button @click="storeDetalhes.openModalLancamento(data.id as number)" variant="outline"
                            class="h-auto px-2 py-1 hover:bg-transparent hover:text-primary/60 dark:hover:text-primary-foreground/50">
                            <Receipt class="w-3 h-3 mr-1" />
                            {{ data.descricao ? truncateText(data.descricao) : 'Sem descricão' }}
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>{{ data.descricao }}</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        </TableCell>
        <TableCell class="font-bold">
            <CellValor :data="data" />
        </TableCell>
        <TableCell class="font-bold hidden md:table-cell">
            <div class="flex items-center bg-secondary px-2 py-1 text-secondary-foreground rounded-md w-max">
                <ChartPie class="w-3 h-3 mr-1" /> {{ data.Categoria?.categoria }}
            </div>
        </TableCell>
        <TableCell class="hidden md:table-cell">
            <LancamentosBadge :data="data" />
        </TableCell>
        <TableCell class="hidden md:table-cell">
            <BadgeMetodo :data="data" />
        </TableCell>
        <TableCell class="hidden md:table-cell">
            <CellVencimentos :data="data" />
        </TableCell>
        <TableCell class="text-right">
            <LancamentosAction :data="data" />
        </TableCell>
    </TableRow>
</template>

<script setup lang="ts">
import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { computed } from "vue";
import { Checkbox } from "@/components/ui/checkbox";
import { LancamentosAction, LancamentosBadge } from ".";
import { ChartPie, Receipt } from "lucide-vue-next";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import ITransacao from "@/types/financeiro/ILancamentos";
import { useLancamentosStore } from "@/stores/financeiro/lancamentos/lancamentoStore";
import BadgeMetodo from "./BadgeMetodo.vue";
import CellVencimentos from "./CellVencimentos.vue";
import CellValor from "./CellValor.vue";
import { useLancamentosDetalhesStore } from "@/stores/financeiro/lancamentos/lancamentosDetalhesStore";
import BadgeNatureza from "./BadgeNatureza.vue";
const mainStore = useLancamentosStore();
const storeDetalhes = useLancamentosDetalhesStore();

const hasSelected = computed(() => {
    return mainStore.selectedItens.includes(props.data.id as number);
});

const truncateText = (text: string) => {
    const maxLength = 20
    if (text.length <= maxLength) return text
    return text.slice(0, maxLength) + '...'
}

const props = defineProps<{
    data: ITransacao
}>();
</script>