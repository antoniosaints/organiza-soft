<template>
    <div class="mx-auto max-w-7xl">
        <div class="flex justify-between items-center mb-4">
            <div>
                <h2 class="text-2xl font-bold text-foreground">Usuários</h2>
                <p class="text-sm font-normal text-foreground hidden md:flex">Listagem de todos os usuários do sistema</p>
            </div>
            <UserDialog/>
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
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import UserDialog from "@/pages/Usuarios/Formulario/UsuarioModal.vue";
import UsuariosRow from "@/pages/Usuarios/UsuariosRow.vue";
import IUsuario from "@/types/usuarios/IUsuario";

defineProps<{
    usersListagem: IUsuario[] | any
}>();
</script>