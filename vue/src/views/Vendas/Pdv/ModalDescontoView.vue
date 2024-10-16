<script setup lang="ts">
import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Percent, Plus } from 'lucide-vue-next';
import DescontoInputView from './DescontoInputView.vue';
import { usePontoDeVendasStore } from '@/stores/vendas/pdv/pontoVendasStore';
const storePDV = usePontoDeVendasStore();
</script>

<template>
    <Dialog>
        <DialogTrigger as-child>
            <Button variant="outline" :class="storePDV.porcentagemDesconto ? 'text-yellow-600' : 'text-foreground'" class="w-min flex-1" size="sm">
                <div v-if="storePDV.porcentagemDesconto" class="flex items-center">
                    {{ (storePDV.porcentagemDesconto * 100).toFixed(0) }}
                    <Percent class="w-3 h-3 mr-1" />
                    Desconto
                </div>
                <div v-else class="flex items-center">
                    <Plus class="w-3 h-3 mr-1" />
                    Desconto
                </div>
            </Button>
        </DialogTrigger>
        <DialogContent class="sm:max-w-[425px]">
            <DialogHeader>
                <DialogTitle>Adicionar desconto</DialogTitle>
                <DialogDescription>
                    O desconto é aplicado sobre o valor total da venda.
                </DialogDescription>
            </DialogHeader>
            <div class="grid gap-4 py-4">
                <div class="flex flex-col gap-2 items-start">
                    <Label for="desconto_pdv" class="text-right">
                        % de desconto
                    </Label>
                    <DescontoInputView />
                </div>
            </div>
            <DialogFooter>
                <DialogClose asChild>
                    <Button type="submit">
                        Aplicar desconto
                    </Button>
                </DialogClose>
            </DialogFooter>
        </DialogContent>
    </Dialog>
</template>