<template>
    <form @submit.prevent="handleSubmit" class="space-y-4">
        <div class="space-y-2">
            <Label for="produto">Produto</Label>
            <Input id="produto" placeholder="Nome do produto" v-model="formularioStore.data.produto" required />
        </div>
        <div class="space-y-2">
            <Label for="preco">Preço</Label>
            <Input id="preco" step="any" placeholder="R$ 0,00" type="number" v-model="formularioStore.data.preco"
                required />
        </div>
        <div class="space-y-2">
            <Label for="categoria">Categoria</Label>
            <SelectSearchAjax labelSearch="Selecione uma categoria" v-model="formularioStore.data.categoriaId" :ajax="fetchUsuarios" />
        </div>
        <div class="grid md:grid-cols-2 gap-4">
            <div class="space-y-2">
                <Label for="color">Cor</Label>
                <Input id="color" placeholder="Cor do produto" type="text"
                    v-model="formularioStore.data.cor" />
            </div>
            <div class="space-y-2">
                <Label for="sku">SKU</Label>
                <Input id="sku" placeholder="SKU" type="text" v-model="formularioStore.data.sku" />
            </div>
        </div>
        <div class="space-y-2">
            <Label for="descricao">Descrição</Label>
            <Textarea id="descricao" placeholder="Descrição" type="text" v-model="formularioStore.data.descricao" />
        </div>
        <div class="flex justify-end space-x-2">
            <Button type="submit">
                <CircleCheck class="w-4 h-4 mr-2" /> {{ formularioStore.refId == null ? 'Salvar' : 'Atualizar'
                }}
            </Button>
        </div>
    </form>
</template>

<script setup lang="ts">
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CircleCheck } from "lucide-vue-next";
import { useProdutoFormularioStore } from "@/stores/patrimonio/produtos/produtoFormularioStore";
import { useProdutoStore } from "@/stores/patrimonio/produtos/produtoStore";
import { ProdutoService } from "@/services/patrimonio/produtoService";
import { Textarea } from "@/components/ui/textarea";
import { SelectSearchAjax} from "@/components/ui/select";
import { CategoriasRepository } from "@/repositories/patrimonio/produtos/categoriasRepository";
const formularioStore = useProdutoFormularioStore();
const mainStore = useProdutoStore();

const handleSubmit = async (): Promise<void> => {
    let res = null;
    if (formularioStore.refId == null) res = await ProdutoService.create(formularioStore.data);
    else res = await ProdutoService.update(formularioStore.refId, formularioStore.data);
    if (res) {
        formularioStore.isModalOpen = false;
        await mainStore.getProdutos();
    }
};

const fetchUsuarios = async (query: string, id?: number) => {
    if (id) {
        return await CategoriasRepository.get(id).then(response => {
            return [{ id: response.id as number, label: response.categoria }]
        })
    }else {
        return await CategoriasRepository.getAll(10, 1, query).then(response => {
            return response.data.map(item => ({ id: item.id as number, label: item.categoria }))
        })
    }
}
</script>