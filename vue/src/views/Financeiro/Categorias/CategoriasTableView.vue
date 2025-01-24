<script setup lang="ts">
import { onMounted } from 'vue'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Button } from '@/components/ui/button'
import { Landmark } from 'lucide-vue-next'
import { useCategoriasLancamentoStore } from '@/stores/financeiro/categorias/categoriaLancamentoStore'
import { DataTableCategoriasFinanceiro } from '@/pages/Financeiro/Categorias/Tabela'
import { columnsCategoriasFinanceiro } from '@/pages/Financeiro/Categorias/Tabela/columns'
import { useCategoriaFormularioStore } from '@/stores/financeiro/categorias/categoriaFormularioStore'
import { ModalFormularioCategoria } from '@/pages/Financeiro/Categorias/Cadastro'

const store = useCategoriasLancamentoStore();
const storeForm = useCategoriaFormularioStore()
interface IDatatableValue {
    search: string
    perpage: string,
    page: number,
    rowSelection: {}
}

const buscarContas = async (table: IDatatableValue) => {
    store.page = table.page
    store.limit = table.perpage
    store.search = table.search
    await store.getCategorias()
}

const openModal = () => {
    storeForm.refId = null
    storeForm.resetData()
    storeForm.isModalOpen = true
}

onMounted(async () => {
    await store.getCategorias()
})
</script>

<template>
    <div class="flex flex-col mx-auto">
        <div class="flex justify-between items-center">
            <div>
                <h2 class="text-2xl font-bold flex items-center text-foreground">Categorias </h2>
                <p class="text-sm font-normal text-foreground hidden md:flex">Listagem de todas as categorias financeiras
                </p>
            </div>
            <div class="flex space-x-2">
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger as-child>
                            <Button size="sm" variant="default" @click="openModal" >
                                <Landmark class="w-4 h-4 mr-2" />
                                Nova categoria
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>Cadastrar nova categoria financeira</TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>
        </div>
        <DataTableCategoriasFinanceiro @dataTableValue="buscarContas"
            :pager="{ rowCount: store.total, pageCount: store.pages }" :columns="columnsCategoriasFinanceiro"
            :data="store.categorias" />
        <ModalFormularioCategoria />
    </div>
</template>