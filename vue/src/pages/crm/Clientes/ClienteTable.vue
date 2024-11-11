<template>
    <div class="mx-auto max-w-7xl">
        <div class="flex justify-between items-center mb-4">
            <div>
                <h2 class="text-2xl font-bold text-foreground">Clientes</h2>
                <p class="text-sm font-normal text-foreground hidden md:flex">Listagem de todos os clientes do sistema
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
                <ClienteModal />
            </div>
        </div>
        <div class="flex space-x-1 w-full md:w-1/2 gap-4 mb-4">
            <Input type="search" @input="(event: any) => { if (event.target.value == '') loadDataChange() }"
                @keyup.enter="loadDataChange" id="rows-per-page" v-model="clienteStore.search"
                placeholder="Pesquisar cliente..." />
            <Button variant="default" class="w-max" @click="loadDataChange">
                <Search class="w-4 h-4 mr-2" />Buscar
            </Button>
            <DropdownMenu v-if="clienteStore.selectedItens.length > 0">
                <DropdownMenuTrigger asChild>
                    <Button variant="outline">
                        <CircleChevronDown class="w-4 h-4 mr-2" /> Ações
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem class="hover:bg-destructive cursor-pointer"
                        @click="openDialogMultilineDelete = true">
                        <Trash2 class="w-4 h-4 mr-2" /> Deletar registros
                    </DropdownMenuItem>
                </DropdownMenuContent>
                <DropdownMenuSeparator />
            </DropdownMenu>
            <AlertDialog v-model:open="openDialogMultilineDelete">
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Confirma essa operação de exclusão?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Após a confirmação, todos os registros selecionados serão deletados.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction class="bg-destructive hover:bg-destructive/90 text-destructive-foreground"
                            @click="deleteMultilineSelects">Deletar</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
        <div class="rounded-lg border shadow-sm overflow-auto">
            <Table v-if="dataExists">
                <TableHeader>
                    <TableRow class="bg-secondary">
                        <TableHead></TableHead>
                        <TableHead>Nome</TableHead>
                        <TableHead class="hidden sm:table-cell">E-mail</TableHead>
                        <TableHead class="hidden md:table-cell">Telefone</TableHead>
                        <TableHead class="hidden md:table-cell">Status</TableHead>
                        <TableHead class="text-right">Ações</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <ClienteRow v-for="cliente in clienteStore.clientes" :key="cliente.id" :cliente="cliente" />
                </TableBody>
            </Table>

            <div v-else class="w-full text-blue-100 flex flex-col justify-center items-center">
                <img class="w-64" src="/not_found.svg" />
                <p class="mb-6 font-sans text-xl text-black dark:text-white flex items-center">Nenhum registro
                    encontrado {{ clienteStore.search == '' ? '' : ' com: ' + clienteStore.search }}</p>
                <Button @click="openFormularioNovoCliente" class="bg-primary mb-6 hover:bg-primary/90">
                    <UserPlus2 class="mr-1 h-4 w-4" /> Novo cliente
                </Button>
            </div>
        </div>
        <div v-if="dataExists" class="flex flex-col md:flex-row justify-between items-center mt-4">
            <Label class="text-foreground/80">Mostrando de {{ rangeStart }} até {{ rangeEnd }} de {{ clienteStore.total
                }}</Label>
            <div class="flex item-center flex-col md:flex-row space-x-4">
                <div class="flex items-center space-x-2">
                    <Label for="rows-per-page"> Registros por página </Label>
                    <Select id="rows-per-page" v-model="clienteStore.limit">
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
                <Pagination :total="clienteStore.total" :items-per-page="Number(clienteStore.limit)" :sibling-count="1"
                    show-edges :default-page="currentPage">
                    <PaginationList v-slot="{ items }" class="flex items-center gap-1">
                        <PaginationFirst as-child @click="loadDataChange(1)">
                            <ChevronFirst :size="14" />
                        </PaginationFirst>
                        <PaginationPrev as-child @click="loadDataChange(currentPage - 1)">
                            <ChevronLeft :size="14" />
                        </PaginationPrev>

                        <template v-for="(item, index) in items">
                            <PaginationListItem v-if="item.type === 'page'" :key="index" :value="item.value" as-child>
                                <Button @click="loadDataChange(item.value)" class="w-10 h-10 p-0"
                                    :variant="item.value === currentPage ? 'default' : 'secondary'">
                                    {{ item.value }}
                                </Button>
                            </PaginationListItem>
                            <PaginationEllipsis v-else :key="item.type" :index="index" />
                        </template>

                        <PaginationNext as-child @click="loadDataChange(currentPage + 1)">
                            <ChevronRight :size="14" />
                        </PaginationNext>
                        <PaginationLast as-child
                            @click="loadDataChange(Math.ceil(clienteStore.total / Number(clienteStore.limit)))">
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
import { ChevronFirst, ChevronLast, ChevronLeft, ChevronRight, CircleChevronDown, Filter, Search, Trash2, UserPlus2 } from "lucide-vue-next";
import { Label } from "@/components/ui/label";
import { onMounted, watch } from "vue";
import { computed } from "vue";
import { Input } from "@/components/ui/input";
import { useClienteStore } from "@/stores/crm/clientes/clienteStore";
import { ClienteRow } from ".";
import ClienteModal from "./Formulario/ClienteModal.vue";
import { useClienteFormularioStore } from "@/stores/crm/clientes/clienteFormularioStore";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ref } from "vue";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";

const clienteStore = useClienteStore();
const clienteFormularioStore = useClienteFormularioStore();
const currentPage = computed(() => Number(clienteStore.page) || 1);
const perPage = computed(() => Number(clienteStore.limit) || 0);
const dataLength = computed(() => clienteStore.clientes?.length ?? 0);
const rangeStart = computed(() => {
  const page = currentPage.value;
  const limit = perPage.value;
  return page > 0 && limit > 0 ? (page - 1) * limit + 1 : 1;
});

const rangeEnd = computed(() => {
  const page = currentPage.value;
  const limit = perPage.value;
  const lancLength = dataLength.value;
  return page > 0 && limit > 0 ? (page - 1) * limit + lancLength : rangeStart.value;
});

const dataExists = computed(() => Number(clienteStore.total) > 0);

const openDialogMultilineDelete = ref(false);

const deleteMultilineSelects = async () => {
    await clienteStore.deleteSelectedItens()
    openDialogMultilineDelete.value = false
}

const openFormularioNovoCliente = () => {
    clienteFormularioStore.isModalOpen = true
    clienteFormularioStore.refId = null
    clienteFormularioStore.resetData();
}

const loadDataChange = async (paginate?: number) => {
    clienteStore.page = paginate || 1;
    await clienteStore.getClientes();
};

onMounted(() => {
    loadDataChange();
});
watch(perPage, () => {
    loadDataChange();
});
</script>