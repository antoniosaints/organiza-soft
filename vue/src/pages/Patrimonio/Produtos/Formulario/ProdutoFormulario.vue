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
            <Select v-model="formularioStore.data.categoriaId as string">
                <SelectTrigger>
                    <SelectValue placeholder="Selecione uma categoria" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem v-for="item in categorias" :key="item.id" :value="(item.id as string)">
                        {{ item.categoria }}
                    </SelectItem>
                </SelectContent>
            </Select>
        </div>
        <div class="grid md:grid-cols-2 gap-4">
            <div class="space-y-2">
                <Label for="color">Cor</Label>
                <Input id="color" class="p-0" ceholder="(00) 00000-0000" type="color"
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
import { onMounted, ref } from "vue";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { IPatrimonioCategoria } from "@/types/patrimonio/IPatrimonioCategoria";
import { CategoriasRepository } from "@/repositories/crm/clientes/categoriasRepository";
const formularioStore = useProdutoFormularioStore();
const mainStore = useProdutoStore();

const categorias = ref<IPatrimonioCategoria[]>([]);

const handleSubmit = async (): Promise<void> => {
    let res = null;
    if (formularioStore.refId == null) res = await ProdutoService.create(formularioStore.data);
    else res = await ProdutoService.update(formularioStore.refId, formularioStore.data);
    if (res) {
        formularioStore.isModalOpen = false;
        await mainStore.getProdutos();
    }
};
onMounted(async () => {
    categorias.value = await CategoriasRepository.getAll();
});
</script>