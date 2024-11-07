<template>
    <div>
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" class="h-7 w-9 p-0">
                    <span class="sr-only">Abrir menu</span>
                    <Ellipsis class="h-6 w-6" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" class="w-auto">
                <DropdownMenuItem class="cursor-pointer" @click="storePdv.gerarLinkPagamentoPìx(data.id as number)">
                    <QrCode  class="mr-2 h-3 w-3" />
                    Gerar Pix
                </DropdownMenuItem>
                <DropdownMenuItem class="cursor-pointer" @click="storePdv.gerarCkheckoutPagamentoPìx(data.id as number)">
                    <Link class="mr-2 h-3 w-3" />
                    Gerar Link
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem class="text-red-600 cursor-pointer" @click="openDialogDelete = true">
                    <Trash2 class="mr-2 h-3 w-3" />
                    Excluir
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
        <AlertDialog v-model:open="openDialogDelete">
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Deseja deletar a venda?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Essa operação não pode ser desfeita.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction class="bg-destructive hover:bg-destructive/90 text-destructive-foreground"
                        @click="onDeletar(data)">Deletar</AlertDialogAction>
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
import VendasRepository from '@/repositories/vendas/vendasRepository';
import { usePontoDeVendasStore } from '@/stores/vendas/pdv/pontoVendasStore';
import { useVendasRelatorioStore } from '@/stores/vendas/relatorios/vendasRelatorioStore';
import { IVenda } from '@/types/vendas/IVenda';
import { ScToastUtil } from '@/utils/scToastUtil';
import { Ellipsis, Link, QrCode, Trash2 } from "lucide-vue-next";
import { ref } from "vue";
const MainState = useVendasRelatorioStore();
const storePdv = usePontoDeVendasStore();

const openDialogDelete = ref(false);

defineProps<{
    data: IVenda
}>()

const onDeletar = async (venda: IVenda) => {
    if (!Autorize.can("deletar", "vendas")) return;
    try {
        await VendasRepository.delete(venda.id as number);
        MainState.page = 1;
        MainState.getVendas();
        MainState.selectedItens = [];
        openDialogDelete.value = false;
        ScToastUtil.success("Venda deletada com sucesso!");
    } catch (e: any) {
        ScToastUtil.warning(e.response.data.message);
    }
}
</script>