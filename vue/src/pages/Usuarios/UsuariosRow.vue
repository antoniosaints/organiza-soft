<template>
    <TableRow class="hover:bg-foreground/5 transition-colors">
        <TableCell ><span class="px-2 py-1 bg-secondary rounded-md">#{{ usuario.id }}</span></TableCell>
        <TableCell>
            <HoverCard>
                <HoverCardTrigger asChild>
                    <Button variant="ghost" class="p-0 h-auto font-normal hover:bg-transparent hover:text-primary/60 dark:hover:text-primary-foreground/50">
                        {{ usuario.nome }}
                        <span v-if="usuario.id == 1" class="px-1 py-0 text-[10px] ml-1 bg-primary text-primary-foreground rounded-md flex items-center"><User class="w-3 h-3" /> Super Admin</span>
                    </Button>
                </HoverCardTrigger>
                <HoverCardContent class="w-80">
                    <UsuarioDetails :usuario="usuario" />
                </HoverCardContent>
            </HoverCard>
        </TableCell>
        <TableCell class="hidden md:table-cell">{{ usuario.email }}</TableCell>
        <TableCell>
            <UsuarioBadge :status="usuario.status" />
        </TableCell>
        <TableCell class="text-right">
            <UsuarioActions :id="usuario.id" />
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
import { User } from "lucide-vue-next";

defineProps<{
    usuario: IUsuario
}>();
</script>