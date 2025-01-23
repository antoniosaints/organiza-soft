<script setup lang="ts">
import { Autorize } from '@/autorization';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import CategoriasLancamentosRepository from '@/repositories/financeiro/categoriasLancamentosRepository';
import { useCategoriaFormularioStore } from '@/stores/financeiro/categorias/categoriaFormularioStore';
import { useCategoriasLancamentoStore } from '@/stores/financeiro/categorias/categoriaLancamentoStore';
import ICategoria from '@/types/financeiro/ICategoria';
import { ScToastUtil } from '@/utils/scToastUtil';
import { Copy, Ellipsis, Pencil, Trash2 } from 'lucide-vue-next'
import { ref } from 'vue';
const store = useCategoriaFormularioStore()
const storeCategorias = useCategoriasLancamentoStore();

defineProps<{
  categoria: ICategoria
}>()
const isOpenModalConfirmar = ref(false)
function copy(id: number) {
  navigator.clipboard.writeText(id.toString())
  ScToastUtil.success("ID copiado com sucesso!")
}
const onEditarCategoria = async (id: number) => {
  if (!Autorize.can("atualizar", "categorias_lancamentos")) return;
  store.refId = id;
  store.data = await CategoriasLancamentosRepository.get(id);
  store.isModalOpen = true;
}

const onExcluirCategoria = async (id: number) => {
  if (!Autorize.can("deletar", "categorias_lancamentos")) return;
  try {
    await CategoriasLancamentosRepository.delete(id);
    storeCategorias.getCategorias();
  } catch (error: any) {
    ScToastUtil.error(error.message);
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
            @click="onExcluirCategoria(categoria.id!)">Deletar</AlertDialogAction>
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
      <DropdownMenuItem @click="onEditarCategoria(categoria.id!)">
        <Pencil class="mr-2 h-3 w-3" />
        Editar
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem @click="copy(categoria.id!)">
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