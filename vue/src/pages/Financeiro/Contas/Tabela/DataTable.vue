<script setup lang="ts" generic="TData, TValue">
import type { ColumnDef, ColumnFiltersState, PaginationState } from '@tanstack/vue-table'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'

import {
    FlexRender,
    getCoreRowModel,
    getFilteredRowModel,
    useVueTable,
} from '@tanstack/vue-table'
import { ref } from 'vue';
import { valueUpdater } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { CircleFadingPlus } from 'lucide-vue-next';
import DataTablePagination from '@/components/tables/DataTablePagination.vue';
const emits = defineEmits(['dataTableValue']);

const INITIAL_PAGE_INDEX = 0
const INITIAL_PAGE_SIZE = 10

const pagination = ref<PaginationState>({
    pageIndex: INITIAL_PAGE_INDEX,
    pageSize: INITIAL_PAGE_SIZE,
})

function setPagination({
    pageIndex,
    pageSize,
}: PaginationState): PaginationState {
    pagination.value.pageIndex = pageIndex
    pagination.value.pageSize = pageSize

    return { pageIndex, pageSize }
}

const search = ref<string>("")
const rowSelection = ref({})

const props = defineProps<{
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
    pager: {
        rowCount: number
        pageCount: number
    },
}>()

const onUpdateValue = async () => {
    emits("dataTableValue", {
        search: search.value,
        perpage: table.getState().pagination.pageSize,
        page: table.getState().pagination.pageIndex + 1,
        rowSelection: rowSelection
    })
}

const onSearch = async (value: string) => {
    search.value = value
    table.setPageIndex(0)
    onUpdateValue()
}

const columnFilters = ref<ColumnFiltersState>([])

const table = useVueTable({
    get data() { return props.data ?? [] },
    get columns() { return props.columns },
    get pageCount() { return props.pager.pageCount ?? -1 },
    state: {
        get columnFilters() { return columnFilters.value },
        get rowSelection() { return rowSelection.value },
        pagination: pagination.value
    },
    manualPagination: true,
    onPaginationChange: updater => {
        if (typeof updater === 'function') {
            setPagination(
                updater({
                    pageIndex: pagination.value.pageIndex,
                    pageSize: pagination.value.pageSize,
                })
            )
        } else {
            setPagination(updater)
        }
        onUpdateValue()
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnFiltersChange: updaterOrValue => valueUpdater(updaterOrValue, columnFilters),
    onRowSelectionChange: updaterOrValue => {
        valueUpdater(updaterOrValue, rowSelection)
        onUpdateValue()
    },
})
</script>

<template>
    <div>
        <div class="flex items-center py-4">
            <Input type="search" class="max-w-sm" placeholder="Filtrar contas..." @input="onSearch($event.target.value)"
                :model-value="(table.getColumn('conta')?.getFilterValue() as string)"
                @update:model-value="table.getColumn('conta')?.setFilterValue($event)" />
        </div>
        <div class="border rounded-md">
            <Table>
                <TableHeader class="bg-secondary">
                    <TableRow v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
                        <TableHead v-for="header in headerGroup.headers" :key="header.id">
                            <FlexRender v-if="!header.isPlaceholder" :render="header.column.columnDef.header"
                                :props="header.getContext()" />
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <template v-if="table.getRowModel().rows?.length">
                        <TableRow v-for="row in table.getRowModel().rows" :key="row.id"
                            :data-state="row.getIsSelected() ? 'selected' : undefined">
                            <TableCell v-for="cell in row.getVisibleCells()" :key="cell.id">
                                <FlexRender :render="cell.column.columnDef.cell" :props="cell.getContext()" />
                            </TableCell>
                        </TableRow>
                    </template>
                    <template v-else>
                        <TableRow>
                            <TableCell :colspan="columns.length" class="h-24 text-center">
                                <div v-show="!data.length"
                                    class="w-full text-blue-100 flex flex-col justify-center items-center">
                                    <img class="w-64" src="/not_found.svg" />
                                    <p class="mb-6 font-sans text-xl text-black dark:text-white flex items-center">
                                        Nenhum
                                        registro
                                        encontrado {{ search == '' ? '' : ' com: ' + search }}</p>

                                    <div class="flex items-center justify-center space-x-2 text-foreground/80 mb-6">
                                        <Button size="sm" variant="default">
                                            <CircleFadingPlus class="mr-1 h-4 w-4" />
                                            Nova conta
                                        </Button>
                                    </div>
                                </div>
                            </TableCell>
                        </TableRow>
                    </template>
                </TableBody>
            </Table>
        </div>
        <div class="flex items-center justify-end py-4 space-x-2">
            <DataTablePagination v-if="data.length" :table="table" />
        </div>
    </div>
</template>