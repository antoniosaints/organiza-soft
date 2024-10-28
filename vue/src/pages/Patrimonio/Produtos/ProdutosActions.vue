<template>
    <div>
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" class="h-7 w-9 p-0">
                    <span class="sr-only">Abrir menu</span>
                    <Ellipsis class="h-6 w-6" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" class="w-28">
                <DropdownMenuItem @click="onEditar(data.id as number)">
                    <Pencil class="mr-2 h-3 w-3" />
                    Editar
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem class="text-red-600" @click="openDialogDelete = true">
                    <Trash2 class="mr-2 h-3 w-3" />
                    Excluir
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
        <AlertDialog v-model:open="openDialogDelete">
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Deseja deletar o produto?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Essa operação não pode ser desfeita.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction class="bg-destructive hover:bg-destructive/90 text-destructive-foreground" @click="onDeletar(data)">Deletar</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    </div>
</template>

<script setup lang="ts">
import { Autorize } from '@/autorization';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ProdutosRepository } from '@/repositories/patrimonio/produtos/produtosRepository';
import { useProdutoFormularioStore } from '@/stores/patrimonio/produtos/produtoFormularioStore';
import { useProdutoStore } from '@/stores/patrimonio/produtos/produtoStore';
import { IPatrimonioProduto } from '@/types/patrimonio/IPatrimonioProduto';
import { ScToastUtil } from '@/utils/scToastUtil';
import { Ellipsis, Pencil, Trash2 } from "lucide-vue-next";
import { ref } from "vue";
const FormularioState = useProdutoFormularioStore();
const MainState = useProdutoStore();

const openDialogDelete = ref(false);

defineProps<{
    data: IPatrimonioProduto
}>()

const onDeletar = async (produto: IPatrimonioProduto) => {
    if (!Autorize.can("deletar", "produtos")) return;
    try {
        await ProdutosRepository.delete(produto.id as number);
        MainState.getProdutos();
        MainState.selectedItens = [];
        openDialogDelete.value = false;
        ScToastUtil.success("Produto deletado com sucesso!");
    } catch (e: any) {
        ScToastUtil.warning(e.response.data.message);
    }
}

const onEditar = async (id: number) => {
    if (!Autorize.can("atualizar", "produtos")) return;
    FormularioState.refId = id;
    FormularioState.data = await ProdutosRepository.get(id);
    FormularioState.isModalOpen = true;
}
</script>