<template>
    <TableRow :class="{ 'bg-primary/40 hover:bg-primary/30': hasSelected }" class="transition-colors">
        <TableCell>
            <Checkbox :checked="hasSelected" @click="mainStore.handleSelectItens(data.id as number)" />
        </TableCell>
        <TableCell><span class="px-2 py-1 bg-secondary rounded-md">#{{ data.id }}</span></TableCell>
        <TableCell>
            <Button @click="openDetailsProduct(data.id as number)" variant="ghost"
                class="p-0 h-auto font-bold hover:bg-transparent hover:text-primary/60 dark:hover:text-primary-foreground/50">
                {{ data.produto }}
            </Button>
        </TableCell>
        <TableCell class="hidden md:table-cell">{{ data.preco }}</TableCell>
        <TableCell class="hidden md:table-cell">{{ data.sku }}</TableCell>
        <TableCell class="hidden md:table-cell">{{ data.cor }}</TableCell>
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
const mainStore = useProdutoStore();
const formularioStore = useProdutoFormularioStore();

const hasSelected = computed(() => {
    return mainStore.selectedItens.includes(props.data.id as number);
});
const openDetailsProduct = (id: number) => {
    formularioStore.refId = id
    formularioStore.isModalDetalhesOpen = true
};
const props = defineProps<{
    data: IPatrimonioProduto
}>();
</script>