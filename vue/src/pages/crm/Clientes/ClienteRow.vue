<template>
    <TableRow :class="{ 'bg-primary/40 hover:bg-primary/30': hasSelected }" class="transition-colors">
        <TableCell ><Checkbox :checked="hasSelected" @click="clienteStore.handleSelectItens(cliente.id as number)" /></TableCell>
        <TableCell ><span class="px-2 py-1 bg-secondary rounded-md">#{{ cliente.id }}</span></TableCell>
        <TableCell >
            <HoverCard>
                <HoverCardTrigger asChild>
                    <Button variant="ghost" class="p-0 h-auto font-bold hover:bg-transparent hover:text-primary/60 dark:hover:text-primary-foreground/50">
                        {{ cliente.nome }}
                    </Button>
                </HoverCardTrigger>
                <HoverCardContent class="w-80">
                    <ClienteDetails :cliente="cliente" />
                </HoverCardContent>
            </HoverCard>
        </TableCell>
        <TableCell class="hidden md:table-cell">{{ cliente.email }}</TableCell>
        <TableCell class="hidden md:table-cell">{{ cliente.telefone }}</TableCell>
        <TableCell class="hidden md:table-cell">
            <ClienteBadge :status="cliente.status" />
        </TableCell>
        <TableCell class="text-right">
            <ClienteAction :cliente="cliente" />
        </TableCell>
    </TableRow>
</template>

<script setup lang="ts">
import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui/hover-card";
import ICliente from "@/types/administracao/clientes/ICliente";
import { ClienteAction, ClienteBadge, ClienteDetails } from ".";
import { useClienteStore } from "@/stores/crm/clientes/clienteStore";
import { computed } from "vue";
import { Checkbox } from "@/components/ui/checkbox";
const clienteStore = useClienteStore();

const hasSelected = computed(() => {
    return clienteStore.selectedItens.includes(props.cliente.id as number);
});

const props = defineProps<{
    cliente: ICliente
}>();
</script>