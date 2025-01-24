<script setup lang="ts">
import { Autorize } from '@/autorization';
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import ContasLancamentosRepository from '@/repositories/financeiro/contasLancamentosRepository';
import { useContaLancamentoFormularioStore } from '@/stores/financeiro/contas/contasLancamentoFormularioStore';
import { useContasLancamentoStore } from '@/stores/financeiro/contas/contasLancamentoStore';
import { ScToastUtil } from '@/utils/scToastUtil';
const mainStore = useContaLancamentoFormularioStore();
const store = useContasLancamentoStore();
const onFormularioSubmit = async () => {
    try {
        if (!Autorize.can("criar", "contas_lancamentos")) return;
        let res = null;
        if (mainStore.refId == null) res = await ContasLancamentosRepository.create(mainStore.data);
        else res = await ContasLancamentosRepository.update(mainStore.refId, mainStore.data);
        if (res) {
            mainStore.isModalOpen = false;
            store.getContas();
        }
        ScToastUtil.success("Operação realizada com sucesso!");
    } catch (error: any) {
        console.log(error);
        ScToastUtil.error(error.response.data.message || "Erro desconhecido.");
    }
}
</script>

<template>
    <Dialog v-model:open="mainStore.isModalOpen">
        <DialogContent class="sm:max-w-[425px]">
            <form @submit.prevent="onFormularioSubmit">
                <DialogHeader>
                    <DialogTitle>Formulário de contas</DialogTitle>
                    <DialogDescription>
                        Cadastro e edição de contas
                    </DialogDescription>
                </DialogHeader>
                <div class="grid grid-cols-2 py-4 gap-4">
                    <div class="flex flex-col gap-2 col-span-2">
                        <Label for="conta">Conta</Label>
                        <Input required id="conta" v-model="mainStore.data.conta" />
                    </div>
                    <div class="flex flex-col gap-2">
                        <Label for="cor">Cor</Label>
                        <SelectCores required id="cor" v-model="mainStore.data.cor" />
                    </div>
                    <div class="flex flex-col gap-2">
                        <Label for="regra">Regra</Label>
                        <Select id="regra" required v-model="mainStore.data.regra">
                            <SelectTrigger>
                                <SelectValue placeholder="Selecione a regra" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="privada">
                                    <div class="flex items-center gap-2">
                                        <div class="h-4 w-4 rounded bg-red-500" />
                                        Privada
                                    </div>
                                </SelectItem>
                                <SelectItem value="publica">
                                    <div class="flex items-center gap-2">
                                        <div class="h-4 w-4 rounded bg-green-500" />
                                        Pública
                                    </div>
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div class="grid w-full gap-1.5 col-span-2">
                        <Label for="observacao">Descrição</Label>
                        <Textarea id="observacao" v-model="mainStore.data.descricao" required
                            placeholder="Descrição." />
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit">
                        Salvar
                    </Button>
                </DialogFooter>
            </form>
        </DialogContent>
    </Dialog>
</template>