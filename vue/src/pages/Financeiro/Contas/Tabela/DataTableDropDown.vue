<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import IContaTransacao from '@/types/financeiro/IContaTransacao';
import { ScToastUtil } from '@/utils/scToastUtil';
import { Copy, MoreHorizontal } from 'lucide-vue-next'

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
      <Button variant="ghost" class="w-8 h-8 p-0">
        <span class="sr-only">Abrir menu</span>
        <MoreHorizontal class="w-4 h-4" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuItem @click="copy(conta.id!)">
        <Copy class="mr-2 h-4 w-4" />
        Copiar ID
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem>View customer</DropdownMenuItem>
      <DropdownMenuItem>View payment details</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>