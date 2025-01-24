<script setup lang="ts">
import { Autorize } from '@/autorization';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import ContasLancamentosRepository from '@/repositories/financeiro/contasLancamentosRepository';
import { useContaLancamentoFormularioStore } from '@/stores/financeiro/contas/contasLancamentoFormularioStore';
import { useContasLancamentoStore } from '@/stores/financeiro/contas/contasLancamentoStore';
import IContaTransacao from '@/types/financeiro/IContaTransacao';
import { ScToastUtil } from '@/utils/scToastUtil';
import { Copy, Ellipsis, Pencil, Trash2 } from 'lucide-vue-next'
import { ref } from 'vue';

const store = useContaLancamentoFormularioStore();
const mainStore = useContasLancamentoStore();
const isOpenModalConfirmar = ref(false)

defineProps<{
  conta: IContaTransacao
}>()

function copy(id: number) {
  navigator.clipboard.writeText(id.toString())
  ScToastUtil.success("ID copiado com sucesso!")
}

const onEditar = async (id: number) => {
  if (!Autorize.can("atualizar", "contas_lancamentos")) return;
  store.refId = id;
  store.data = await ContasLancamentosRepository.get(id);
  store.isModalOpen = true;
}

const onExcluir = async (id: number) => {
  if (!Autorize.can("deletar", "contas_lancamentos")) return;
  try {
    await ContasLancamentosRepository.delete(id);
    mainStore.getContas();
    ScToastUtil.success("Registro deletado com sucesso!");
  } catch (e: any) {
    ScToastUtil.warning(e.response.data.message);
  }
}
</script>

<template>
  <DropdownMenu>
    <AlertDialog v-model:open="isOpenModalConfirmar">
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Deseja deletar a categoria?</AlertDialogTitle>
          <AlertDialogDescription>
            Essa operação não pode ser desfeita.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction class="bg-destructive hover:bg-destructive/90 text-destructive-foreground"
            @click="onExcluir(conta.id!)">Deletar</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
    <DropdownMenuTrigger as-child>
      <Button variant="outline" size="sm" class="h-7 w-9 p-0">
        <span class="sr-only">Abrir menu</span>
        <Ellipsis class="h-6 w-6" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuItem @click="onEditar(conta.id!)">
        <Pencil class="mr-2 h-3 w-3" />
        Editar
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem @click="copy(conta.id!)">
        <Copy class="mr-2 h-3 w-3" />
        Copiar ID
      </DropdownMenuItem>
      <DropdownMenuItem @click="isOpenModalConfirmar = true" class="text-red-600 cursor-pointer">
        <Trash2 class="mr-2 h-3 w-3" />
        Excluir
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>