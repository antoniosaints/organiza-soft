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
                <!-- <DropdownMenuItem class="cursor-pointer">
                    <Link class="mr-2 h-3 w-3" />
                    Link de Pagamento
                </DropdownMenuItem> -->
                <!-- <DropdownMenuItem class="cursor-pointer">
                    <RefreshCw class="mr-2 h-3 w-3" />
                    Converter
                </DropdownMenuItem> -->
                <DropdownMenuItem @click="efetivarLancamento(data.id as number)" v-if="(data.status === 'pendente' && !data.FinanceiroParcelamento?.length )" class="cursor-pointer">
                    <FileCheck class="mr-2 h-3 w-3" />
                    Efetivar
                </DropdownMenuItem>
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
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import LancamentosRepository from '@/repositories/financeiro/lancamentosRepository';
import { useLancamentosStore } from '@/stores/financeiro/lancamentos/lancamentoStore';
import ITransacao from '@/types/financeiro/ILancamentos';
import { ScToastUtil } from '@/utils/scToastUtil';
import { Ellipsis, FileCheck, Trash2 } from "lucide-vue-next";
import { ref } from "vue";
const MainState = useLancamentosStore();

const openDialogDelete = ref(false);

defineProps<{
    data: ITransacao
}>()

const onDeletar = async (lancamento: ITransacao) => {
    if (!Autorize.can("deletar", "lancamentos")) return;
    try {
        await LancamentosRepository.delete(lancamento.id as number);
        MainState.page = 1;
        MainState.getLancamentos();
        MainState.selectedItens = [];
        openDialogDelete.value = false;
        ScToastUtil.success("Lançamento deletado com sucesso!");
    } catch (e: any) {
        ScToastUtil.warning(e.response.data.message);
    }
}

const efetivarLancamento = async (id: number) => {
    try {
        await LancamentosRepository.efetivar(id);
        MainState.getLancamentos();
        ScToastUtil.success("Lançamento efetivado com sucesso!");
    } catch (e: any) {
        ScToastUtil.warning(e.response.data.message);
    }
}
</script>