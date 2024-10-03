<template>
    <TableRow :class="{ 'bg-primary/40 hover:bg-primary/30': hasSelected }" class="transition-colors">
        <TableCell>
            <Checkbox :checked="hasSelected" @click="clienteStore.handleSelectItens(cliente.id as number)" />
        </TableCell>
        <TableCell>
            <HoverCard>
                <HoverCardTrigger asChild>
                    <Button variant="outline"
                        class="px-2 py-1 h-auto font-bold hover:bg-transparent hover:text-primary/60 dark:hover:text-primary-foreground/50">
                        <User class="w-3 h-3 mr-1" />
                        {{ cliente.nome }}
                    </Button>
                </HoverCardTrigger>
                <HoverCardContent class="w-80">
                    <ClienteDetails :cliente="cliente" />
                </HoverCardContent>
            </HoverCard>
        </TableCell>
        <TableCell class="hidden md:table-cell">
            <div class="px-2 py-1 bg-primary text-primary-foreground flex items-center rounded-md w-min">
                <AtSign class="w-3 h-3 mr-1" />
                {{ cliente.email }}
            </div>
        </TableCell>
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
import { AtSign, User } from "lucide-vue-next";
const clienteStore = useClienteStore();

const hasSelected = computed(() => {
    return clienteStore.selectedItens.includes(props.cliente.id as number);
});

const props = defineProps<{
    cliente: ICliente
}>();
</script>