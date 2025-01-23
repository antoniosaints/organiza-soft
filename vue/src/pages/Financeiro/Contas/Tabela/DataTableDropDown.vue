<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import IContaTransacao from '@/types/financeiro/IContaTransacao';
import { ScToastUtil } from '@/utils/scToastUtil';
import { Copy, Ellipsis, Pencil, Trash2 } from 'lucide-vue-next'

defineProps<{
  conta: IContaTransacao
}>()

function copy(id: number) {
  navigator.clipboard.writeText(id.toString())
  ScToastUtil.success("ID copiado com sucesso!")
}
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="outline" size="sm" class="h-7 w-9 p-0">
        <span class="sr-only">Abrir menu</span>
        <Ellipsis class="h-6 w-6" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuItem>
        <Pencil class="mr-2 h-3 w-3" />
        Editar
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem @click="copy(conta.id!)">
        <Copy class="mr-2 h-3 w-3" />
        Copiar ID
      </DropdownMenuItem>
      <DropdownMenuItem class="text-red-600 cursor-pointer">
        <Trash2 class="mr-2 h-3 w-3" />
        Excluir
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>