<template>
    <div class="mx-auto max-w-7xl">
        <div class="flex justify-between items-center mb-4">
            <div>
                <h2 class="text-2xl font-bold text-foreground">Usuários</h2>
                <p class="text-sm font-normal text-foreground hidden md:flex">Listagem de todos os usuários do sistema</p>
            </div>
            <div class="flex space-x-2">
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger>
                            <Button size="sm" variant="outline"> <Filter class="w-4 h-4" /> </Button>
                        </TooltipTrigger>
                        <TooltipContent>Filtrar registros</TooltipContent>
                    </Tooltip> 
                </TooltipProvider>
                <UserDialog/>
            </div>
        </div>
        <div class="rounded-lg border shadow-sm overflow-hidden">
            <Table>
                <TableHeader>
                    <TableRow class="bg-secondary">
                        <TableHead>ID</TableHead>
                        <TableHead>Nome</TableHead>
                        <TableHead class="hidden md:table-cell">Email</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead class="text-right">Ações</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <UsuariosRow v-for="usuario in usersListagem" :key="usuario.id" :client="usuario" />
                </TableBody>
            </Table>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Tooltip from "@/components/ui/tooltip/Tooltip.vue";
import TooltipContent from "@/components/ui/tooltip/TooltipContent.vue";
import TooltipProvider from "@/components/ui/tooltip/TooltipProvider.vue";
import TooltipTrigger from "@/components/ui/tooltip/TooltipTrigger.vue";
import UserDialog from "@/pages/Usuarios/Formulario/UsuarioModal.vue";
import UsuariosRow from "@/pages/Usuarios/UsuariosRow.vue";
import IUsuario from "@/types/usuarios/IUsuario";
import { Filter } from "lucide-vue-next";

defineProps<{
    usersListagem: IUsuario[] | any
}>();
</script>