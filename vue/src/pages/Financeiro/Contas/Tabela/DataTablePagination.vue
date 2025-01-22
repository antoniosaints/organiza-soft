<script setup lang="ts">
import { type Table } from '@tanstack/vue-table'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { DoubleArrowLeftIcon, DoubleArrowRightIcon } from '@radix-icons/vue'
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-vue-next'

interface DataTablePaginationProps {
  table: Table<any>
}
defineProps<DataTablePaginationProps>()
</script>

<template>
  <div class="flex items-center w-full justify-between relative px-2">
    <div v-show="table.getFilteredSelectedRowModel().rows.length > 0" class="flex-1 text-sm space-x-2 text-muted-foreground">
      {{ table.getFilteredSelectedRowModel().rows.length }} de
      {{ table.getFilteredRowModel().rows.length }} linha(s) selecionada(s).
    </div>
    <div class="flex items-center absolute right-0 top-0 space-x-2">
      <div class="flex items-center space-x-2">
        <p class="text-sm font-medium">
          Exibir
        </p>
        <Select
          :model-value="`${table.getState().pagination.pageSize}`"
          @update:model-value="table.setPageSize(Number($event))"
        >
          <SelectTrigger class="h-8">
            <SelectValue :placeholder="`${table.getState().pagination.pageSize}`" />
          </SelectTrigger>
          <SelectContent side="top">
            <SelectItem v-for="pageSize in [10, 20, 30, 50, 100]" :key="pageSize" :value="`${pageSize}`">
              {{ pageSize }}
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div class="flex items-center justify-center text-sm font-medium">
        Página {{ table.getState().pagination.pageIndex + 1 }} de
        {{ table.getPageCount() }}
      </div>
      <div class="flex items-center space-x-2">
        <Button
          variant="outline"
          class="hidden w-8 h-8 p-0 lg:flex"
          :disabled="!table.getCanPreviousPage()"
          @click="table.setPageIndex(0)"
        >
          <span class="sr-only">ir para primeira pagina</span>
          <DoubleArrowLeftIcon class="w-4 h-4" />
        </Button>
        <Button
          variant="outline"
          class="w-8 h-8 p-0"
          :disabled="!table.getCanPreviousPage()"
          @click="table.previousPage()"
        >
          <span class="sr-only">ir para pagina anterior</span>
          <ChevronLeftIcon class="w-4 h-4" />
        </Button>
        <Button
          variant="outline"
          class="w-8 h-8 p-0"
          :disabled="!table.getCanNextPage()"
          @click="table.nextPage()"
        >
          <span class="sr-only">ir para proxima pagina</span>
          <ChevronRightIcon class="w-4 h-4" />
        </Button>
        <Button
          variant="outline"
          class="hidden w-8 h-8 p-0 lg:flex"
          :disabled="!table.getCanNextPage()"
          @click="table.setPageIndex(table.getPageCount() - 1)"
        >
          <span class="sr-only">ir para ultima pagina</span>
          <DoubleArrowRightIcon class="w-4 h-4" />
        </Button>
      </div>
    </div>
  </div>
</template>