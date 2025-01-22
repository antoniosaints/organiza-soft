<script setup lang="ts" generic="TData, TValue">
import type { ColumnDef, ColumnFiltersState } from '@tanstack/vue-table'
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
    getPaginationRowModel,
    getFilteredRowModel,
    useVueTable,
} from '@tanstack/vue-table'
import { ref, watch } from 'vue';
import { valueUpdater } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import DataTablePagination from './DataTablePagination.vue';
const emits = defineEmits(['dataTableValue']);

const search = ref<string>("")
const props = defineProps<{
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
}>()

const onUpdateValue = async () => {
    emits("dataTableValue", {
        search: search.value,
        perpage: table.getState().pagination.pageSize,
        page: table.getState().pagination.pageIndex + 1
    })
}

const onSearch = async (value: string) => {
    search.value = value
    onUpdateValue()
}

const columnFilters = ref<ColumnFiltersState>([])
const rowSelection = ref({})

const table = useVueTable({
    get data() { return props.data },
    get columns() { return props.columns },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: updaterOrValue => valueUpdater(updaterOrValue, columnFilters),
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: updaterOrValue => valueUpdater(updaterOrValue, rowSelection),
    state: {
        get columnFilters() { return columnFilters.value },
        get rowSelection() { return rowSelection.value },
    },
})

watch(
    () => table.getState().pagination.pageSize,
    onUpdateValue
)
watch(
    () => table.getState().pagination.pageIndex,
    onUpdateValue
)

</script>

<template>
    <div>
        <div class="flex items-center py-4">
            <Input class="max-w-sm" placeholder="Filtrar contas..." @input="onSearch($event.target.value)"
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
                                Nenhum resultado.
                            </TableCell>
                        </TableRow>
                    </template>
                </TableBody>
            </Table>
        </div>
        <div class="flex items-center justify-end py-4 space-x-2">
            <DataTablePagination :table="table" />
        </div>
    </div>
</template>