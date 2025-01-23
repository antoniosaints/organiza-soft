<script setup lang="ts">
import { Autorize } from '@/autorization'
import SelectCores from '@/components/customs/SelectCores.vue'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import CategoriasLancamentosRepository from '@/repositories/financeiro/categoriasLancamentosRepository'
import { useCategoriaFormularioStore } from '@/stores/financeiro/categorias/categoriaFormularioStore'
import { useCategoriasLancamentoStore } from '@/stores/financeiro/categorias/categoriaLancamentoStore'
import { ScToastUtil } from '@/utils/scToastUtil'

const store = useCategoriaFormularioStore()
const storeCategorias = useCategoriasLancamentoStore();
const submitLancamento = async () => {
    try {
        if (!Autorize.can("criar", "categorias_lancamentos")) return;
        let res = null;
        if (store.refId == null) res = await CategoriasLancamentosRepository.create(store.data);
        else res = await CategoriasLancamentosRepository.update(store.refId, store.data);
        if (res) {
            store.isModalOpen = false;
            storeCategorias.getCategorias();
        }
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
                <Input id="categoria" placeholder="Descrição da categoria" required v-model="store.data.categoria" />
            </div>
            <div class="space-y-2 p-2">
                <Label for="cor">Cor</Label>
                <SelectCores required id="cor" v-model="store.data.cor" />
            </div>
            <div class="space-y-2 p-2 flex justify-end">
                <Button variant="default" type="submit"> Registrar </Button>
            </div>
        </form>
    </div>
</template>
