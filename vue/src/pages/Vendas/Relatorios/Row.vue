<template>
    <TableRow :class="{ 'bg-primary/40 hover:bg-primary/30': hasSelected }" class="transition-colors">
        <TableCell>
            <Checkbox :checked="hasSelected" @click="mainStore.handleSelectItens(data.id as number)" />
        </TableCell>
        <TableCell>
            <Button @click="openDetailsProduct(data.id as number)" variant="outline"
                class="h-auto px-2 py-1 hover:bg-transparent hover:text-primary/60 dark:hover:text-primary-foreground/50">
                <Tag class="w-3 h-3 mr-1" />
                {{ data.uniqueId }}
            </Button>
        </TableCell>
        <TableCell class="font-bold">{{ data.valor.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL' }) }}</TableCell>
        <TableCell class="hidden md:table-cell">
            <VendasBadge :status="data.status" />
        </TableCell>
        <TableCell class="hidden md:table-cell"><span class="px-2 py-1 rounded-md bg-card text-secondary-foreground flex items-center w-min"><User class="w-3 h-3 mr-1" /> {{ data.Cliente?.nome.split(' ')[0] }}</span>
        </TableCell>
        <TableCell class="hidden md:table-cell"><span class="px-2 py-1 rounded-md bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200 hover:bg-emerald-300 dark:hover:bg-emerald-700 flex items-center w-min"><CreditCard class="w-3 h-3 mr-1" /> {{ data.metodoPagamento }}</span>
        </TableCell>
        <TableCell class="hidden md:table-cell"><span class="px-2 py-1 bg-secondary rounded-md">{{ formatDateToPtbr(data.dataCriacao as string) }}</span></TableCell>
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
const mainStore = useVendasRelatorioStore();
const formularioStore = useVendasFormularioStore();

const hasSelected = computed(() => {
    return mainStore.selectedItens.includes(props.data.id as number);
});
const openDetailsProduct = (id: number) => {
    formularioStore.refId = id
    formularioStore.isModalDetalhesOpen = true
};

const formatDateToPtbr = (date: string) => {
    const formated = new Date(date);

    const formattedDate = formated.toLocaleDateString('pt-BR', {
        timeZone: 'America/Sao_Paulo',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false // Formato 24h
    });

    return formattedDate
}
const props = defineProps<{
    data: IVenda
}>();
</script>