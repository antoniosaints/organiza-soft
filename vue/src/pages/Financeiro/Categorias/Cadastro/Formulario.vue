<script setup lang="ts">
import { Autorize } from '@/autorization'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import CategoriasLancamentosRepository from '@/repositories/financeiro/categoriasLancamentosRepository'
import { useCategoriaFormularioStore } from '@/stores/financeiro/categorias/categoriaFormularioStore'
import { ScToastUtil } from '@/utils/scToastUtil'

const store = useCategoriaFormularioStore()
const submitLancamento = async () => {
    try {
        if (!Autorize.can("criar", "categorias_lancamentos")) return;
        await CategoriasLancamentosRepository.create(store.data)
        ScToastUtil.success("Categoria cadastrada com sucesso!");
        store.resetData()
        store.isModalOpen = false
    } catch (error: any) {
        ScToastUtil.error(error.message);
    }
}
</script>

<template>
    <div>
        <form @submit.prevent="submitLancamento">
            <div class="space-y-2 p-2">
                <Label for="categoria">Categoria</Label>
                <Input id="categoria" placeholder="Descrição da categoria" v-model="store.data.categoria" />
            </div>
            <div class="space-y-2 p-2">
                <Label for="cor">Cor</Label>
                <Input id="cor" type="color" class="p-0" v-model="store.data.cor" />
            </div>
            <div class="space-y-2 p-2 flex justify-end">
                <Button variant="default" type="submit"> Registrar </Button>
            </div>
        </form>
    </div>
</template>
