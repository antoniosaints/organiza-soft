<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { columnsContasFinanceiro } from '@/pages/Financeiro/Contas/Tabela/columns'
import { DataTableContasFinanceiro } from '@/pages/Financeiro/Contas/Tabela'
import { useContasLancamentoStore } from '@/stores/financeiro/contas/contasLancamentoStore'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Button } from '@/components/ui/button'
import { Landmark } from 'lucide-vue-next'
import ContasModal from '@/pages/Financeiro/Contas/Modais/ContasModal.vue'
import { useContaLancamentoFormularioStore } from '@/stores/financeiro/contas/contasLancamentoFormularioStore'

const store = useContasLancamentoStore();
const mainStore = useContaLancamentoFormularioStore();
const isLoading = ref(false)
interface IDatatableValue {
    search: string
    perpage: string,
    page: number,
    rowSelection: {}
}

const onFetch = async (table: IDatatableValue) => {
    isLoading.value = true
    store.page = table.page
    store.limit = table.perpage
    store.search = table.search
    await store.getContas()
    isLoading.value = false
}

const onSave = () => {
    mainStore.refId = null
    mainStore.resetData()
    mainStore.isModalOpen = true
}

onMounted(async () => {
    store.page = 1
    await store.getContas()
})
</script>

<template>
    <div class="flex flex-col mx-auto">
        <div class="flex justify-between items-center">
            <div>
                <h2 class="text-2xl font-bold flex items-center text-foreground">Contas </h2>
                <p class="text-sm font-normal text-foreground hidden md:flex">Listagem de todas as contas financeiras
                </p>
            </div>
            <div class="flex space-x-2">
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger>
                            <Button size="sm" variant="default" @click="onSave">
                                <Landmark class="w-4 h-4 mr-2" />
                                Nova conta
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>Cadastrar nova conta financeira</TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>
        </div>
        <DataTableContasFinanceiro @dataTableValue="onFetch"
            :pager="{ rowCount: store.total, pageCount: store.pages }" :columns="columnsContasFinanceiro"
            :data="store.contas" />
        <ContasModal />
    </div>
</template>