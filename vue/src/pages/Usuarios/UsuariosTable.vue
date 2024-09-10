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
        <div class="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 gap-4 mb-4">
            <Input type="search" @input="(event: any) => { if (event.target.value == '') reloadTableUsuarios() }"
                @keyup.enter="reloadTableUsuarios" id="rows-per-page" v-model="usuarioStore.search"
                placeholder="Pesquisar usuário..." />
            <Button variant="default" class="w-max" @click="reloadTableUsuarios">
                <Search class="w-4 h-4 mr-2" />Buscar
            </Button>
        </div>
        <div class="rounded-lg border shadow-sm overflow-auto">
            <Table v-if="UsuariosExists">
                <TableHeader>
                    <TableRow class="bg-secondary">
                        <TableHead>ID</TableHead>
                        <TableHead>Nome</TableHead>
                        <TableHead class="hidden sm:table-cell">Permissão</TableHead>
                        <TableHead class="hidden md:table-cell">Email</TableHead>
                        <TableHead class="hidden md:table-cell">Status</TableHead>
                        <TableHead class="text-right">Ações</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <UsuariosRow v-for="usuario in usuarioStore.usuarios" :key="usuario.id" :usuario="usuario" />
                </TableBody>
            </Table>

            <div v-else class="w-full h-full text-blue-100 flex justify-center items-center">
                <TreePalm />
                <p class="ml-2 h-40 font-sans text-xl flex items-center">Nenhum para visualizar com ( {{ usuarioStore.search }} )</p>
            </div>
        </div>
        <div v-if="UsuariosExists" class="flex flex-col md:flex-row justify-between items-center mt-4">
            <Label class="text-foreground/80">Mostrando de {{ rangeStart }} até {{ rangeEnd }} de {{ usuarioStore.total
                }}</Label>
            <div class="flex item-center flex-col md:flex-row space-x-4">
                <div class="flex items-center space-x-2">
                    <Label for="rows-per-page"> Registros por página </Label>
                    <Select id="rows-per-page" v-model="usuarioStore.limit">
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
                <Pagination :total="usuarioStore.total" :items-per-page="Number(usuarioStore.limit)" :sibling-count="1"
                    show-edges :default-page="usuarioStore.page">
                    <PaginationList v-slot="{ items }" class="flex items-center gap-1">
                        <PaginationFirst as-child @click="loadUsers(1)">
                            <ChevronFirst :size="14" />
                        </PaginationFirst>
                        <PaginationPrev as-child @click="loadUsers(usuarioStore.page - 1)">
                            <ChevronLeft :size="14" />
                        </PaginationPrev>

                        <template v-for="(item, index) in items">
                            <PaginationListItem v-if="item.type === 'page'" :key="index" :value="item.value" as-child>
                                <Button @click="loadUsers(item.value)" class="w-10 h-10 p-0"
                                    :variant="item.value === usuarioStore.page ? 'default' : 'secondary'">
                                    {{ item.value }}
                                </Button>
                            </PaginationListItem>
                            <PaginationEllipsis v-else :key="item.type" :index="index" />
                        </template>

                        <PaginationNext as-child @click="loadUsers(usuarioStore.page + 1)">
                            <ChevronRight :size="14" />
                        </PaginationNext>
                        <PaginationLast as-child
                            @click="loadUsers(Math.ceil(usuarioStore.total / Number(usuarioStore.limit)))">
                            <ChevronLast :size="14" />
                        </PaginationLast>
                    </PaginationList>
                </Pagination>
            </div>
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
import { ChevronFirst, ChevronLast, ChevronLeft, ChevronRight, Filter, Search, TreePalm } from "lucide-vue-next";
import { Label } from "@/components/ui/label";
import { useUsuarioStore } from "@/stores/usuarios/usuarioStore";
import { onMounted, watch } from "vue";
import { computed } from "vue";
import { Input } from "@/components/ui/input";

const usuarioStore = useUsuarioStore();
const perPage = computed(() => usuarioStore.limit);
const rangeStart = computed(() => (usuarioStore.page - 1) * Number(usuarioStore.limit) + 1);
const rangeEnd = computed(() => (usuarioStore.page - 1) * Number(usuarioStore.limit) + usuarioStore.usuarios.length);
const UsuariosExists = computed(() => usuarioStore.usuarios.length > 0);

watch(perPage, () => {
    loadUsers(1);
});

const loadUsers = async (paginate: number) => {
    usuarioStore.page = paginate || 1;
    await usuarioStore.getUsuarios();
};

const reloadTableUsuarios = async () => {
    await usuarioStore.getUsuarios();
};

onMounted(() => {
    loadUsers(1);
});
</script>