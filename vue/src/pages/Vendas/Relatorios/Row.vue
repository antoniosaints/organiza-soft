<template>
    <TableRow :class="{ 'bg-primary/40 hover:bg-primary/30': hasSelected }" class="transition-colors">
        <TableCell>
            <Checkbox :checked="hasSelected" @click="mainStore.handleSelectItens(data.id as number)" />
        </TableCell>
        <TableCell>
            <TooltipProvider>
                <Tooltip :delay-duration="200">
                    <TooltipTrigger as-child>
                        <Button @click="openDetailsProduct(data.id as number)" variant="outline"
                            class="h-auto px-2 py-1 hover:bg-transparent hover:text-primary/60 dark:hover:text-primary-foreground/50">
                            <Tag class="w-3 h-3 mr-1" />

                            {{ data.descricao ? truncateText(data.descricao) : 'Sem descricão' }}
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>{{ data.descricao }}</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        </TableCell>
        <TableCell class="font-bold">{{ formatRealValue(data.valor - data.valorDesconto!) }}</TableCell>
        <TableCell class="hidden md:table-cell">
            <VendasBadge :status="data.status" />
        </TableCell>
        <TableCell class="hidden md:table-cell"><span
                class="px-2 py-1 rounded-md bg-card text-secondary-foreground flex items-center w-max">
                <User class="w-3 h-3 mr-1" /> {{ formatName(data.Cliente?.nome!) }}
            </span>
        </TableCell>
        <TableCell class="hidden md:table-cell"><span
                class="px-2 py-1 rounded-md bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200 hover:bg-indigo-300 dark:hover:bg-indigo-700 flex items-center w-min">
                <CreditCard class="w-3 h-3 mr-1" /> {{ formatFirstLetterUpper(data.metodoPagamento!) }}
            </span>
        </TableCell>
        <TableCell class="hidden md:table-cell"><span class="px-2 py-1 bg-secondary rounded-md">{{
            formatDateToPtbr(data.dataCriacao as string) }}</span></TableCell>
        <TableCell class="text-right">
            <VendasAction :data="data" />
        </TableCell>
    </TableRow>
</template>

<script setup lang="ts">
import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { computed } from "vue";
import { Checkbox } from "@/components/ui/checkbox";
import { VendasAction, VendasBadge } from ".";
import { CreditCard, Tag, User } from "lucide-vue-next";
import { IVenda } from "@/types/vendas/IVenda";
import { useVendasRelatorioStore } from "@/stores/vendas/relatorios/vendasRelatorioStore";
import { useVendasFormularioStore } from "@/stores/vendas/relatorios/vendasFormularioStore";
import { formatDateToPtbr, formatFirstLetterUpper, formatName, formatRealValue } from "@/utils/formatterUtil";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
const mainStore = useVendasRelatorioStore();
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
    data: IVenda
}>();
</script>