<template>
    <TableRow :class="{ 'bg-primary/40 hover:bg-primary/30': hasSelected }" class="transition-colors">
        <TableCell>
            <Checkbox :checked="hasSelected" @click="mainStore.handleSelectItens(data.id as number)" />
        </TableCell>
        <TableCell><span
                class="px-2 py-1 rounded-md text-secondary-foreground flex items-center w-min bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 hover:bg-green-300 dark:hover:bg-green-700"
                :class="{ 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 hover:bg-red-300 dark:hover:bg-red-700': data.natureza === 'despesa' }">
                <ArrowUpDown class="w-3 h-3 mr-1" /> {{ data.natureza.charAt(0).toUpperCase() + data.natureza.slice(1) }}
            </span>
        </TableCell>
        <TableCell>
            <TooltipProvider>
                <Tooltip :delay-duration="200">
                    <TooltipTrigger as-child>
                        <Button @click="openDetailsProduct(data.id as number)" variant="outline"
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
        <TableCell class="font-bold">{{ formatRealValue(data.valor - data.desconto!) }}</TableCell>
        <TableCell class="hidden md:table-cell">
            <LancamentosBadge :status="data.status" />
        </TableCell>
        <TableCell class="hidden md:table-cell"><span
                class="px-2 py-1 rounded-md bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200 hover:bg-indigo-300 dark:hover:bg-indigo-700 flex items-center w-min">
                <CreditCard class="w-3 h-3 mr-1" /> {{ data.FormaPagamento?.forma }}
            </span>
        </TableCell>
        <TableCell class="hidden md:table-cell"><span class="px-2 py-1 bg-secondary rounded-md">{{
            formatDateToPtbr(data.dataLancamento as string) }}</span></TableCell>
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
import { ArrowUpDown, CreditCard, Receipt, Tag } from "lucide-vue-next";
import { useVendasFormularioStore } from "@/stores/vendas/relatorios/vendasFormularioStore";
import { formatDateToPtbr, formatRealValue } from "@/utils/formatterUtil";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import ITransacao from "@/types/financeiro/ILancamentos";
import { useLancamentosStore } from "@/stores/financeiro/lancamentos/lancamentoStore";
const mainStore = useLancamentosStore();
const formularioStore = useVendasFormularioStore();

const hasSelected = computed(() => {
    return mainStore.selectedItens.includes(props.data.id as number);
});
const openDetailsProduct = (id: number) => {
    formularioStore.refId = id
    formularioStore.isModalDetalhesOpen = true
};

const truncateText = (text: string) => {
    const maxLength = 20
    if (text.length <= maxLength) return text
    return text.slice(0, maxLength) + '...'
}

const props = defineProps<{
    data: ITransacao
}>();
</script>