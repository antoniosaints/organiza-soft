<script setup lang="ts">
import SelectCores from '@/components/customs/SelectCores.vue';
import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useContaLancamentoFormularioStore } from '@/stores/financeiro/contas/contasLancamentoFormularioStore';
const mainStore = useContaLancamentoFormularioStore();
</script>

<template>
    <Dialog v-model:open="mainStore.isModalOpen">
        <DialogContent class="sm:max-w-[425px]">
            <DialogHeader>
                <DialogTitle>Formulário de contas</DialogTitle>
                <DialogDescription>
                    Cadastro e edição de contas
                </DialogDescription>
            </DialogHeader>
            <div class="grid gap-4 py-4">
                <div class="flex flex-col gap-2">
                    <Label for="conta">Conta</Label>
                    <Input required id="conta" v-model="mainStore.data.conta" />
                </div>
                <div class="flex flex-col gap-2">
                    <Label for="cor">Cor</Label>
                    <SelectCores required id="cor" v-model="mainStore.data.cor" />
                </div>
            </div>
            <DialogFooter>
                <Button type="submit">
                    Salvar
                </Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
</template>