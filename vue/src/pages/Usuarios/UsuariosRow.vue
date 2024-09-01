<template>
    <TableRow class="hover:bg-foreground/5 transition-colors">
        <TableCell ><span class="px-2 py-1 bg-secondary rounded-md">#{{ client.id }}</span></TableCell>
        <TableCell>
            <HoverCard>
                <HoverCardTrigger asChild>
                    <Button variant="ghost" class="p-0 h-auto font-normal">
                        {{ client.nome }}
                    </Button>
                </HoverCardTrigger>
                <HoverCardContent class="w-80">
                    <UsuarioDetails :client="client" />
                </HoverCardContent>
            </HoverCard>
        </TableCell>
        <TableCell class="hidden md:table-cell">{{ client.email }}</TableCell>
        <TableCell>
            <UsuarioBadge :status="client.status" />
        </TableCell>
        <TableCell class="text-right">
            <UsuarioActions :id="client.id" />
        </TableCell>
    </TableRow>
</template>

<script setup lang="ts">
import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui/hover-card";
import UsuarioDetails from "@/pages/Usuarios/UsuarioDetails.vue";
import UsuarioBadge from "@/pages/Usuarios/UsuarioBadge.vue";
import UsuarioActions from "@/pages/Usuarios/UsuarioActions.vue";
import IUsuario from "@/types/usuarios/IUsuario";

defineProps<{
    client: IUsuario
}>();
</script>