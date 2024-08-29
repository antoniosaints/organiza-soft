<template>
    <div class="container mx-auto max-w-7xl">
        <div class="flex justify-between items-center mb-4">
            <h2 class="text-2xl font-bold text-foreground">Usuários</h2>
            <Button size="sm" class="bg-primary hover:bg-primary/90">
                <UserPlus class="mr-1 h-3 w-3" />
                Novo Usuário
            </Button>
        </div>
        <div class="rounded-lg border shadow-sm overflow-hidden">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Nome</TableHead>
                        <TableHead class="hidden sm:table-cell">Email</TableHead>
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
import { UserPlus } from "lucide-vue-next";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import UsuariosRow from "@/pages/Usuarios/UsuariosRow.vue";
import IUsuario from "@/types/usuarios/IUsuario";

defineProps<{
    usersListagem: IUsuario[] | null
}>();
</script>