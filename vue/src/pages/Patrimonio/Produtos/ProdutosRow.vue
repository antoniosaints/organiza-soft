<template>
    <TableRow :class="{ 'bg-primary/40 hover:bg-primary/30': hasSelected }" class="transition-colors">
        <TableCell>
            <Checkbox :checked="hasSelected" @click="mainStore.handleSelectItens(data.id as number)" />
        </TableCell>
        <TableCell>
            <Button @click="openDetailsProduct(data.id as number)" variant="outline"
                class="h-auto px-2 py-1 hover:bg-transparent hover:text-primary/60 dark:hover:text-primary-foreground/50">
                <Tag class="w-3 h-3 mr-1" />
                {{ data.produto }}
            </Button>
        </TableCell>
        <TableCell class="font-bold">{{ data.preco.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL' }) }}</TableCell>
        <TableCell class="hidden md:table-cell">
            <div class="px-2 py-1 bg-primary text-primary-foreground rounded-md flex items-center w-min">
                <ScanBarcode class="w-3 h-3 mr-1" />
                {{ data.sku }}
            </div>
        </TableCell>
        <TableCell class="hidden md:table-cell"><span class="px-2 py-1 rounded-md">{{ data.cor }}</span>
        </TableCell>
        <TableCell class="hidden md:table-cell"><span class="px-2 py-1 bg-secondary rounded-md">{{ formatDateToPtbr(data.dataCriado as string) }}</span></TableCell>
        <TableCell class="text-right">
            <ProdutosAction :data="data" />
        </TableCell>
    </TableRow>
</template>

<script setup lang="ts">
import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { computed } from "vue";
import { Checkbox } from "@/components/ui/checkbox";
import { useProdutoStore } from "@/stores/patrimonio/produtos/produtoStore";
import { IPatrimonioProduto } from "@/types/patrimonio/IPatrimonioProduto";
import { useProdutoFormularioStore } from "@/stores/patrimonio/produtos/produtoFormularioStore";
import { ProdutosAction } from ".";
import { ScanBarcode, Tag } from "lucide-vue-next";
const mainStore = useProdutoStore();
const formularioStore = useProdutoFormularioStore();

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
    data: IPatrimonioProduto
}>();
</script>