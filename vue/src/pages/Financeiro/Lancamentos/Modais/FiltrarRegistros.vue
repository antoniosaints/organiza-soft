<script setup lang="ts">
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Label } from '@/components/ui/label';
import { useLancamentosStore } from '@/stores/financeiro/lancamentos/lancamentoStore';
import { Filter, Trash } from 'lucide-vue-next';
import { computed } from 'vue';
const financeiroStore = useLancamentosStore();
const filters = computed(() => {
    let filters = 0;
    if (financeiroStore.status != "todos") filters ++;
    if (financeiroStore.natureza != "todos") filters ++;
    return filters
})
const handleSubmit = async (e: any) => {
    e.preventDefault()
    await financeiroStore.getLancamentos();
    financeiroStore.isModalFilterOpen = false
}

const cleanFilter = async () => {
    financeiroStore.status = "todos"
    financeiroStore.natureza = "todos"
    await financeiroStore.getLancamentos();
    financeiroStore.isModalFilterOpen = false
}
</script>

<template>
    <Dialog v-model:open="financeiroStore.isModalFilterOpen">
        <DialogTrigger>
            <Button class="relative" size="sm" variant="outline">
                <div v-show="filters > 0" class="absolute top-[-5px] left-[-5px] w-4 h-4 bg-red-500 rounded-full text-white text-xs flex justify-center items-center">{{filters}}</div>
                <Filter class="w-4 h-4" />
            </Button>
        </DialogTrigger>
        <DialogContent class="sm:max-w-[425px]">
            <DialogHeader>
                <DialogTitle>Filtrar Registros</DialogTitle>
            </DialogHeader>
            <form @submit="handleSubmit" class="space-y-4">
                <div class="space-y-2">
                    <Label for="status">Status</Label>
                    <Select v-model="financeiroStore.status">
                        <SelectTrigger id="status">
                            <SelectValue placeholder="Selecione o status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="todos">Todos</SelectItem>
                            <SelectItem value="pendente">Pendente</SelectItem>
                            <SelectItem value="recebido">Efetivado</SelectItem>
                            <SelectItem value="cancelada">Cancelado</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div class="space-y-2">
                    <Label for="transactionType">Natureza do Lançamento</Label>
                    <Select v-model="financeiroStore.natureza">
                        <SelectTrigger id="transactionType">
                            <SelectValue placeholder="Selecione a natureza" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="todos">Todas</SelectItem>
                            <SelectItem value="receita">Receita</SelectItem>
                            <SelectItem value="despesa">Despesa</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div class="flex justify-end space-x-2">
                    <Button size="sm" type="button" variant="destructive"
                        @click="cleanFilter"><Trash class="w-4 h-4" /> </Button>
                    <Button size="sm" type="button" variant="outline"
                        @click="financeiroStore.isModalFilterOpen = false">Cancelar</Button>
                    <Button size="sm" type="submit">Aplicar Filtros</Button>
                </div>
            </form>
        </DialogContent>
    </Dialog>
</template>
