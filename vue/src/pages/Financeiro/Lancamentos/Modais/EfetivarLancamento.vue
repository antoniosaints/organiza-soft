<template>
    <Dialog v-model:open="formStore.isModalEfetivarOpen" @open-change="setIsOpen">
        <DialogContent class="sm:max-w-[425px]">
            <DialogHeader>
                <DialogTitle>Efetivar Lançamento</DialogTitle>
                <DialogDescription>
                    Escolha uma data para efetivar o lançamento.
                </DialogDescription>
            </DialogHeader>

            <form @submit.prevent="handleSubmit">
                <div class="space-y-2 p-2">
                    <Label for="dataPagamento">Data da efetivação</Label>
                    <VueDatePicker :min-date="!canPagamentosRetroativos ? new Date() : null"
                        :day-names="namesOfWeekDatePicker" placeholder="Data da efetivação" required :dark="isDark"
                        v-model="date" format="dd/MM/yyyy" locale="pt" auto-apply utc />
                </div>
                <div class="space-y-2 p-2">
                    <Label for="tipoPagamento">Tipo de Pagamento</Label>
                    <Select v-model="formaPagamento" required>
                        <SelectTrigger id="tipoPagamento">
                            <SelectValue placeholder="Selecione o tipo de pagamento" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="dinheiro">Dinheiro</SelectItem>
                            <SelectItem value="pix">Pix</SelectItem>
                            <SelectItem value="cartao">Cartão de Crédito</SelectItem>
                            <SelectItem value="transferencia">Transferência Bancária</SelectItem>
                            <SelectItem value="boleto">Boleto</SelectItem>
                            <SelectItem value="cheque">Cheque</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div class="space-y-2 p-2">
                    <DialogFooter>
                        <Button type="submit">Confirmar efetivação</Button>
                    </DialogFooter>
                </div>

            </form>
        </DialogContent>
    </Dialog>
</template>

<script setup>
import { ref, computed } from 'vue'
import { CalendarIcon } from 'lucide-vue-next'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog'
import {
    Popover,
    PopoverContent,
} from '@/components/ui/popover'
import { useColorMode } from '@vueuse/core'
import { Button } from '@/components/ui/button'
import { useLancamentosFormularioStore } from '@/stores/financeiro/lancamentos/lancamentosFormularioStore'
import { ScToastUtil } from '@/utils/scToastUtil'
import { useLancamentosStore } from '@/stores/financeiro/lancamentos/lancamentoStore'
import LancamentosRepository from '@/repositories/financeiro/lancamentosRepository'
import { namesOfWeekDatePicker } from '@/utils/datepickerUtil'
import { useLoginStore } from '@/stores/login/loginStore'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
const colorMode = useColorMode()
const formStore = useLancamentosFormularioStore()
const lancamentoStore = useLancamentosStore()
const loginStore = useLoginStore()

const date = ref(new Date())
const formaPagamento = ref("pix")
const isDark = computed(() => colorMode.value === 'dark');

const canPagamentosRetroativos = computed(() => {
    return !!loginStore.dataUserInfosLogged?.pagamentosRetroativos
})

const setIsOpen = (state) => {
    formStore.isModalEfetivarOpen = state
}

const handleSubmit = async (event) => {
    event.preventDefault()
    if (date.value && formStore.refId) {
        const data = {
            date: date.value,
            formaPagamento: formaPagamento.value
        };
        await LancamentosRepository.efetivar(formStore.refId, data)
        await lancamentoStore.getLancamentos()
        setIsOpen(false)
    } else {
        ScToastUtil.warning('Erro ao efetivar lançamento, tente novamente!')
    }
}
</script>
