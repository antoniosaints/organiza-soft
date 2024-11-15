<script setup lang="ts">
import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from '@/components/ui/dialog'
import { usePontoDeVendasStore } from '@/stores/vendas/pdv/pontoVendasStore';
import SelectAjax from '@/components/customs/SelectAjax.vue';
import { createClienteLancamento, getClientesLancamento } from '@/pages/Financeiro/Lancamentos/Cadastro/dataCliente';
import { Autorize } from '@/autorization';
const storePDV = usePontoDeVendasStore();
const canCreateClienteLancamento = Autorize.can("criar", "clientes")!
</script>

<template>
    <Dialog v-model:open="storePDV.isOpenClienteModal" @open-change="storePDV.isOpenClienteModal = $event">
        <DialogContent class="sm:max-w-[425px]">
            <DialogHeader>
                <DialogTitle>Selecione o cliente</DialogTitle>
                <DialogDescription>
                    O desconto é aplicado sobre o valor total da venda.
                </DialogDescription>
            </DialogHeader>
            <div class="flex flex-col gap-4 w-full">
                <SelectAjax class="w-full" clearable v-model:label="storePDV.nomeCliente" :can-create="canCreateClienteLancamento"
                    v-model="(storePDV.clienteVenda as number)" :create-option="createClienteLancamento"
                    :load-options="getClientesLancamento" />
            </div>
            <DialogFooter>
                <DialogClose asChild>
                    <Button type="submit">
                        Confirmar cliente
                    </Button>
                </DialogClose>
            </DialogFooter>
        </DialogContent>
    </Dialog>
</template>