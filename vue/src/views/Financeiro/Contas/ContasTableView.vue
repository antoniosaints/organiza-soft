<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { columnsContasFinanceiro } from '@/pages/Financeiro/Contas/Tabela/columns'
import { DataTableContasFinanceiro } from '@/pages/Financeiro/Contas/Tabela'
import { useContasLancamentoStore } from '@/stores/financeiro/contas/contasLancamentoStore'
import { Loader } from 'lucide-vue-next'
import IContaTransacao from '@/types/financeiro/IContaTransacao'
import ContasLancamentosRepository from '@/repositories/financeiro/contasLancamentosRepository'

const store = useContasLancamentoStore()
const data = ref<IContaTransacao[]>([])
const isLoading = ref(false)
interface IDatatableValue {
    search: string
    perpage: string,
    page: number
}

const buscarContas = async (table: IDatatableValue) => {
    isLoading.value = true
    const response = await ContasLancamentosRepository.getAll(Number(table.perpage), table.page, table.search)
    data.value = response.data
    isLoading.value = false
    console.log(store.contas)
    console.log(table)
}

onMounted(async () => {
    await store.getContas()
})
</script>

<template>
    <div class="flex flex-col mx-auto">
        <div>
            <h2 class="text-2xl font-bold flex items-center text-foreground">Contas Financeiras <Loader class="animate-spin" v-if="isLoading" /></h2>
            <p class="text-sm font-normal text-foreground hidden md:flex">Listagem de todas as contas financeiras
            </p>
        </div>
        <DataTableContasFinanceiro @dataTableValue="buscarContas" :columns="columnsContasFinanceiro" :data="data" />
    </div>
</template>