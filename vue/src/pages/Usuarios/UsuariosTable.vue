<template>
    <div class="mx-auto max-w-7xl">
        <div class="flex justify-between items-center mb-4">
            <div>
                <h2 class="text-2xl font-bold text-foreground">Usuários</h2>
                <p class="text-sm font-normal text-foreground hidden md:flex">Listagem de todos os usuários do sistema
                </p>
            </div>
            <div class="flex space-x-2">
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger>
                            <Button size="sm" variant="outline">
                                <Filter class="w-4 h-4" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>Filtrar registros</TooltipContent>
                    </Tooltip>
                </TooltipProvider>
                <UserDialog />
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
                    <UsuariosRow v-for="usuario in usuarioStore.usuarios" :key="usuario.id" :usuario="usuario" />
                </TableBody>
            </Table>
        </div>
        <div class="flex justify-between items-center mt-4">
            <div class="flex items-center space-x-2">
                <Label for="rows-per-page"> Registros por página </Label>
                <Select id="rows-per-page" v-model="perPage">
                    <SelectTrigger class="w-auto">
                        <SelectValue placeholder="Quantidade de registros" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="10">
                            10
                        </SelectItem>
                        <SelectItem value="25">
                            25
                        </SelectItem>
                        <SelectItem value="50">
                            50
                        </SelectItem>
                        <SelectItem value="75">
                            75
                        </SelectItem>
                        <SelectItem value="100">
                            100
                        </SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <Pagination v-slot="{ page }" :total="usuarioStore.total" :items-per-page="Number(perPage)"
                :sibling-count="1" show-edges :default-page="page">
                <PaginationList v-slot="{ items }" class="flex items-center gap-1">
                    <PaginationFirst as-child @click="loadUsers(1)">
                        <ChevronFirst :size="14" />
                    </PaginationFirst>
                    <PaginationPrev as-child @click="loadUsers(page - 1)">
                        <ChevronLeft :size="14" />
                    </PaginationPrev>

                    <template v-for="(item, index) in items">
                        <PaginationListItem v-if="item.type === 'page'" :key="index" :value="item.value" as-child>
                            <Button @click="loadUsers(item.value)" class="w-10 h-10 p-0"
                                :variant="item.value === page ? 'default' : 'secondary'">
                                {{ item.value }}
                            </Button>
                        </PaginationListItem>
                        <PaginationEllipsis v-else :key="item.type" :index="index" />
                    </template>

                    <PaginationNext as-child @click="loadUsers(page + 1)">
                        <ChevronRight :size="14" />
                    </PaginationNext>
                    <PaginationLast as-child @click="loadUsers(Math.ceil(usuarioStore.total / Number(perPage)))">
                        <ChevronLast :size="14" />
                    </PaginationLast>
                </PaginationList>
            </Pagination>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import {
    Pagination,
    PaginationEllipsis,
    PaginationFirst,
    PaginationLast,
    PaginationList,
    PaginationListItem,
    PaginationNext,
    PaginationPrev,
} from '@/components/ui/pagination'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import UserDialog from "@/pages/Usuarios/Formulario/UsuarioModal.vue";
import UsuariosRow from "@/pages/Usuarios/UsuariosRow.vue";
import { ChevronFirst, ChevronLast, ChevronLeft, ChevronRight, Filter } from "lucide-vue-next";
import { Label } from "@/components/ui/label";
import { useUsuarioStore } from "@/stores/usuarios/usuarioStore";
import { onMounted, ref, watch } from "vue";

const usuarioStore = useUsuarioStore();
const perPage = ref('10');
const page = ref(1);

watch(perPage, () => {
    loadUsers(1);
});

const loadUsers = async (page: number) => {
    await usuarioStore.getUsuarios(Number(perPage.value), page);
};

onMounted(() => {
    loadUsers(1);
});
</script>