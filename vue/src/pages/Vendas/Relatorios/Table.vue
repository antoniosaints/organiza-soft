<template>
    <div class="mx-auto max-w-7xl">
        <div class="flex justify-between items-center mb-4">
            <div>
                <h2 class="text-2xl font-bold text-foreground">Vendas</h2>
                <p class="text-sm font-normal text-foreground hidden md:flex">Listagem de todas as vendas do sistema
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
                <VendasModal />
            </div>
        </div>
        <div class="flex space-x-1 w-full md:w-1/2 gap-4 mb-4">
            <Input type="search" @input="(event: any) => { if (event.target.value == '') reloadTable() }"
                @keyup.enter="reloadTable" id="rows-per-page" v-model="mainStore.search"
                placeholder="Pesquisar produto..." />
            <Button variant="default" class="w-max" @click="reloadTable">
                <Search class="w-4 h-4 mr-2" />Buscar
            </Button>
            <DropdownMenu v-if="mainStore.selectedItens.length > 0">
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
                        <TableHead>Venda</TableHead>
                        <TableHead>Valor</TableHead>
                        <TableHead class="hidden md:table-cell">Status</TableHead>
                        <TableHead class="hidden md:table-cell">Cliente</TableHead>
                        <TableHead class="hidden md:table-cell">Pagamento</TableHead>
                        <TableHead class="hidden md:table-cell">Criação</TableHead>
                        <TableHead class="text-right">Ações</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <VendasRow v-for="data in mainStore.vendas" :key="data.id" :data="data" />
                </TableBody>
            </Table>

            <div v-else class="w-full text-blue-100 flex flex-col justify-center items-center">
                <img class="w-64" src="/not_found.svg" />
                <p class="mb-6 font-sans text-xl text-black dark:text-white flex items-center">Nenhum registro
                    encontrado {{ mainStore.search == '' ? '' : ' com: ' + mainStore.search }}</p>
                <Button @click="openFormularioNovoRegistro" class="bg-primary mb-6 hover:bg-primary/90">
                    <UserPlus2 class="mr-1 h-4 w-4" /> Novo produto
                </Button>
            </div>
        </div>
        <DetalhesProduto />
        <div v-if="dataExists" class="flex flex-col md:flex-row justify-between items-center mt-4">
            <Label class="text-foreground/80">Mostrando de {{ rangeStart }} até {{ rangeEnd }} de {{ mainStore.total
                }}</Label>
            <div class="flex item-center flex-col md:flex-row space-x-4">
                <div class="flex items-center space-x-2">
                    <Label for="rows-per-page"> Registros por página </Label>
                    <Select id="rows-per-page" v-model="mainStore.limit">
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
                <Pagination :total="mainStore.total" :items-per-page="Number(mainStore.limit)" :sibling-count="1"
                    show-edges :default-page="mainStore.page">
                    <PaginationList v-slot="{ items }" class="flex items-center gap-1">
                        <PaginationFirst as-child @click="loadDataChange(1)">
                            <ChevronFirst :size="14" />
                        </PaginationFirst>
                        <PaginationPrev as-child @click="loadDataChange(mainStore.page - 1)">
                            <ChevronLeft :size="14" />
                        </PaginationPrev>

                        <template v-for="(item, index) in items">
                            <PaginationListItem v-if="item.type === 'page'" :key="index" :value="item.value" as-child>
                                <Button @click="loadDataChange(item.value)" class="w-10 h-10 p-0"
                                    :variant="item.value === mainStore.page ? 'default' : 'secondary'">
                                    {{ item.value }}
                                </Button>
                            </PaginationListItem>
                            <PaginationEllipsis v-else :key="item.type" :index="index" />
                        </template>

                        <PaginationNext as-child @click="loadDataChange(mainStore.page + 1)">
                            <ChevronRight :size="14" />
                        </PaginationNext>
                        <PaginationLast as-child
                            @click="loadDataChange(Math.ceil(mainStore.total / Number(mainStore.limit)))">
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
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ref } from "vue";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { VendasRow } from ".";
import DetalhesProduto from "./Infos/DetalhesProduto.vue";
import { useVendasRelatorioStore } from "@/stores/vendas/relatorios/vendasRelatorioStore";
import { useVendasFormularioStore } from "@/stores/vendas/relatorios/vendasFormularioStore";
import { VendasModal } from "./Formulario";

const mainStore = useVendasRelatorioStore();
const formularioStore = useVendasFormularioStore();
const perPage = computed(() => mainStore.limit);
const rangeStart = computed(() => (mainStore.page - 1) * Number(mainStore.limit) + 1);
const rangeEnd = computed(() => (mainStore.page - 1) * Number(mainStore.limit) + mainStore.vendas.length);
const dataExists = computed(() => mainStore.vendas.length > 0);

watch(perPage, () => {
    loadDataChange(1);
});

const openDialogMultilineDelete = ref(false);

const deleteMultilineSelects = async () => {
    await mainStore.deleteSelectedItens()
    openDialogMultilineDelete.value = false
}

const openFormularioNovoRegistro = () => {
    formularioStore.isModalOpen = true
    formularioStore.refId = null
    formularioStore.resetData();
}

const loadDataChange = async (paginate: number) => {
    mainStore.page = paginate || 1;
    await mainStore.getVendas();
};

const reloadTable = async () => {
    await mainStore.getVendas();
};

onMounted(() => {
    loadDataChange(1);
});
</script>