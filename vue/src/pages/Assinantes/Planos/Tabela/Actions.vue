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
                <DropdownMenuItem @click="converterLancamento(data.id as number, data.natureza)" class="cursor-pointer">
                    <Replace class="mr-2 h-3 w-3" />
                    Converter
                </DropdownMenuItem>
                <DropdownMenuItem @click="estornarPagamento(data.id as number)" v-if="(canEstornarLancamento)"
                    class="cursor-pointer">
                    <Undo2 class="mr-2 h-3 w-3" />
                    Estornar
                </DropdownMenuItem>
                <DropdownMenuItem @click="openModalEfetivar(data.id as number)"
                    v-if="(canEfetivarLancamento)" class="cursor-pointer">
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
import { useLancamentosFormularioStore } from '@/stores/financeiro/lancamentos/lancamentosFormularioStore';
import { useLancamentosStore } from '@/stores/financeiro/lancamentos/lancamentoStore';
import ITransacao from '@/types/financeiro/ILancamentos';
import { ScToastUtil } from '@/utils/scToastUtil';
import { Ellipsis, FileCheck, Replace, Trash2, Undo2 } from "lucide-vue-next";
import { computed, ref } from "vue";
const MainState = useLancamentosStore();
const FormularioStore = useLancamentosFormularioStore();

const openDialogDelete = ref(false);

const props = defineProps<{
    data: ITransacao
}>()

const canEstornarLancamento = computed(() => {
    return (props.data.status === 'recebido' && !props.data.FinanceiroParcelamento?.length && Autorize.can("estornar", "lancamentos"));
})
const canEfetivarLancamento = computed(() => {
    return (props.data.status === 'pendente' && !props.data.FinanceiroParcelamento?.length && Autorize.can("efetivar", "lancamentos"));
})

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

const estornarPagamento = async (id: number) => {
    if (!Autorize.can("estornar", "lancamentos")) return;
    try {
        await LancamentosRepository.estornarLancamento(id);
        MainState.getLancamentos();
        ScToastUtil.success("Lançamento estornado com sucesso!");
    } catch (e: any) {
        ScToastUtil.warning(e.response.data.message);
    }
}
const converterLancamento = async (id: number, natureza: "receita" | "despesa") => {
    if (!Autorize.can("atualizar", "lancamentos")) return;
    try {
        await LancamentosRepository.converterLancamento(id, natureza);
        MainState.getLancamentos();
        ScToastUtil.success("Lançamento convertido com sucesso!");
    } catch (e: any) {
        ScToastUtil.warning(e.response.data.message);
    }
}

const openModalEfetivar = (id: number) => {
    if (!Autorize.can("efetivar", "lancamentos")) return;
    FormularioStore.refId = id
    FormularioStore.isModalEfetivarOpen = true
}
</script>