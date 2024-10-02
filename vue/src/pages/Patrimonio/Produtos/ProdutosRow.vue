<template>
    <TableRow :class="{ 'bg-primary/40 hover:bg-primary/30': hasSelected }" class="transition-colors">
        <TableCell ><Checkbox :checked="hasSelected" @click="mainStore.handleSelectItens(data.id as number)" /></TableCell>
        <TableCell ><span class="px-2 py-1 bg-secondary rounded-md">#{{ data.id }}</span></TableCell>
        <TableCell >
            <HoverCard>
                <HoverCardTrigger asChild>
                    <Button variant="ghost" class="p-0 h-auto font-bold hover:bg-transparent hover:text-primary/60 dark:hover:text-primary-foreground/50">
                        {{ data.produto }}
                    </Button>
                </HoverCardTrigger>
                <HoverCardContent class="w-80">
                    <ProdutosDetails :data="data" />
                </HoverCardContent>
            </HoverCard>
        </TableCell>
        <TableCell class="hidden md:table-cell">{{ data.preco }}</TableCell>
        <TableCell class="hidden md:table-cell">{{ data.sku }}</TableCell>
        <TableCell class="hidden md:table-cell">{{ data.cor }}</TableCell>
        <TableCell class="text-right"><ProdutosAction :data="data" /></TableCell>
    </TableRow>
</template>

<script setup lang="ts">
import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui/hover-card";
import { computed } from "vue";
import { Checkbox } from "@/components/ui/checkbox";
import { useProdutoStore } from "@/stores/patrimonio/produtos/produtoStore";
import { IPatrimonioProduto } from "@/types/patrimonio/IPatrimonioProduto";
import { ProdutosAction, ProdutosDetails } from ".";
const mainStore = useProdutoStore();

const hasSelected = computed(() => {
    return mainStore.selectedItens.includes(props.data.id as number);
});

const props = defineProps<{
    data: IPatrimonioProduto
}>();
</script>