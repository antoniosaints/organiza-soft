<template>
    <div class="mx-auto max-w-7xl">
        <div class="flex justify-between items-center mb-4">
            <div>
                <h2 class="text-2xl font-bold text-foreground">Lancamentos</h2>
                <p class="text-sm font-normal text-foreground hidden md:flex">Listagem de todos os lancamentos
                </p>
            </div>
            <div class="flex space-x-2">
                <DetalhesLancamento />
                <EfetivarLancamento />
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger>
                            <FiltrarRegistros />
                        </TooltipTrigger>
                        <TooltipContent>Filtrar registros</TooltipContent>
                    </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger>
                            <Button @click="formularioStore.isModalDetalhesOpen = true" size="sm" variant="default"
                                class="flex gap-2">
                                <CircleFadingPlus class="w-4 h-4" />
                                Novo lançamento
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>Cadastrar novo lançamento</TooltipContent>
                    </Tooltip>
                </TooltipProvider>
                <SheetModal />
            </div>
        </div>
        <div class="flex space-x-1 w-full flex-col md:flex-row justify-between gap-4 mb-4">
            <div class="flex space-x-2 md:w-1/2 w-full">
                <Input type="search" @input="(event: any) => { if (event.target.value == '') loadDataChange() }"
                    @keyup.enter="loadDataChange" id="rows-per-page" v-model="mainStore.search"
                    placeholder="Buscar lancamentos..." />
                <Button variant="default" class="w-max" @click="loadDataChange">
                    <Loader v-if="mainStore.isLoading" class="w-4 h-4 mr-2 animate-spin" />
                    <Search v-else class="w-4 h-4 mr-2" />{{ mainStore.isLoading ? 'Buscando...' : 'Buscar' }}
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
            </div>
            <div class="flex md:w-1/3 lg:w-1/4 w-full">
                <div class="flex space-x-2 mr-2" v-if="false">
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger>
                                <Button size="xs" variant="destructive">
                                    <FilterX class="w-4 h-4" />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>Limpar filtros</TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
                <VueDatePicker placeholder="Período de filtragem" format="dd/MM/yyyy" select-text="Aplicar"
                    cancel-text="Fechar" :preset-dates="presetsDatePickerVue" locale="pt" :dark="darkMode" utc
                    v-model="dateFilter" range>
                    <template #preset-date-range-button="{ label, value, presetDate }">
                        <span role="button" :tabindex="0" @click="presetDate(value)"
                            @keyup.enter.prevent="presetDate(value)" @keyup.space.prevent="presetDate(value)">
                            {{ label }}
                        </span>
                    </template>
                </VueDatePicker>
            </div>
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
            <CompartilharLink />
            <Table v-show="dataExists">
                <TableHeader>
                    <TableRow class="bg-secondary">
                        <TableHead></TableHead>
                        <TableHead>Tipo</TableHead>
                        <TableHead>Lançamento</TableHead>
                        <TableHead>Valor</TableHead>
                        <TableHead class="hidden md:table-cell">Categoria</TableHead>
                        <TableHead class="hidden md:table-cell">Status</TableHead>
                        <TableHead class="hidden md:table-cell">Pagamento</TableHead>
                        <TableHead class="hidden md:table-cell">Vencimento</TableHead>
                        <TableHead class="text-right">Ações</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <LancamentosRow v-for="data in mainStore.lancamentos" :key="data.id" :data="data" />
                </TableBody>
            </Table>
            <div v-show="!dataExists" class="w-full text-blue-100 flex flex-col justify-center items-center">
                <img class="w-64" src="/not_found.svg" />
                <p class="mb-6 font-sans text-xl text-black dark:text-white flex items-center">Nenhum registro
                    encontrado {{ mainStore.search == '' ? '' : ' com: ' + mainStore.search }}</p>

                <div class="flex items-center justify-center space-x-2 text-foreground/80 mb-6">
                    <Button size="sm" variant="default" @click="formularioStore.isModalDetalhesOpen = true">
                        <CircleFadingPlus class="mr-1 h-4 w-4" />
                        Novo lançamento
                    </Button>
                </div>
            </div>
        </div>
        <DetalhesProduto />
        <div v-show="dataExists && !mainStore.isLoading" class="flex flex-col md:flex-row justify-between items-center mt-4">
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
import { ChevronFirst, ChevronLast, ChevronLeft, ChevronRight, CircleChevronDown, CircleFadingPlus, FilterX, Loader, Search, Trash2 } from "lucide-vue-next";
import { Label } from "@/components/ui/label";
import { onMounted, watch, computed, ref } from "vue";
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { LancamentosRow } from ".";
import DetalhesProduto from "./Infos/DetalhesProduto.vue";
import CompartilharLink from "@/views/Vendas/Pdv/CompartilharLink.vue";
import { useLancamentosStore } from "@/stores/financeiro/lancamentos/lancamentoStore";
import SheetModal from "../Cadastro/SheetModal.vue";
import { useLancamentosFormularioStore } from "@/stores/financeiro/lancamentos/lancamentosFormularioStore";
import DetalhesLancamento from "../Modais/DetalhesLancamento.vue";
import { presetsDatePickerVue } from "@/utils/datepickerUtil";
import { useColorMode } from "@vueuse/core";
import EfetivarLancamento from "../Modais/EfetivarLancamento.vue";
import FiltrarRegistros from "../Modais/FiltrarRegistros.vue";
const colormode = useColorMode();

onMounted(() => {
    loadDataChange();
});
const mainStore = useLancamentosStore();
const formularioStore = useLancamentosFormularioStore();
const perPage = computed(() => Number(mainStore.limit) || 0);
const currentPage = computed(() => Number(mainStore.page) || 1);
const lancamentosLength = computed(() => mainStore.lancamentos?.length ?? 0);

const rangeStart = computed(() => {
    const page = currentPage.value;
    const limit = perPage.value;
    return page > 0 && limit > 0 ? (page - 1) * limit + 1 : 1;
});

const rangeEnd = computed(() => {
    const page = currentPage.value;
    const limit = perPage.value;
    const lancLength = lancamentosLength.value;
    return page > 0 && limit > 0 ? (page - 1) * limit + lancLength : rangeStart.value;
});

const darkMode = computed(() => colormode.value === "dark" ? true : false)
const dataExists = computed(() => Number(mainStore.total) > 0);
const dateFilter = ref<string[]>([])
const openDialogMultilineDelete = ref(false);

watch(perPage, () => {
    loadDataChange();
});

const deleteMultilineSelects = async () => {
    await mainStore.deleteSelectedItens()
    openDialogMultilineDelete.value = false
}

const loadDataChange = async (paginate?: number) => {
    mainStore.page = paginate || 1;
    await mainStore.getLancamentos(dateFilter.value);
};
</script>