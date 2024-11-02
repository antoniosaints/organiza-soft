<template>
    <form @submit.prevent="handleSubmit" class="space-y-4">
        <div class="space-y-2">
            <Label for="produto">Produto</Label>
            <Input id="produto" placeholder="Nome do produto" v-model="formularioStore.data.produto" required />
        </div>
        <div class="grid md:grid-cols-2 gap-4">
            <div class="space-y-2">
                <Label for="preco">Preço</Label>
                <NumberField id="balance" required v-model:modelValue="formularioStore.data.preco" :min="0" :step="0.01" :format-options="{
                    style: 'currency',
                    currency: 'BRL',
                    maximumFractionDigits: 2,
                    compactDisplay: 'short',
                    notation: 'standard',
                    currencyDisplay: 'narrowSymbol',
                    currencySign: 'standard',
                }">
                    <NumberFieldContent>
                        <NumberFieldDecrement />
                        <NumberFieldInput class="bg-secondary" />
                        <NumberFieldIncrement />
                    </NumberFieldContent>
                </NumberField>
            </div>
            <div class="space-y-2">
                <Label for="categoria">Categoria</Label>
                <SelectSearchAjax id="categoria" labelSearch="Selecione uma categoria"
                    v-model="formularioStore.data.categoriaId" :ajax="fetchUsuarios" />
            </div>
        </div>
        <div class="grid md:grid-cols-2 gap-4">
            <div class="space-y-2">
                <Label for="color">Cor</Label>
                <Input id="color" placeholder="Cor do produto" type="text" v-model="formularioStore.data.cor" />
            </div>
            <div class="space-y-2">
                <Label for="sku">SKU</Label>
                <Input id="sku" placeholder="SKU" type="text" v-model="formularioStore.data.sku" />
            </div>
        </div>
        <div class="grid md:grid-cols-2 gap-4">
            <div class="space-y-2">
                <Label for="codigoBarra">Código de barra </Label>
                <div class="flex w-full max-w-sm items-center gap-1.5">
                    <Input id="codigoBarra" type="text" placeholder="Código de barra"
                        v-model="formularioStore.data.codigoBarra" />
                    <Button type="button" variant="default" @click="generateCodigoBarra" class="w-min flex-1">
                        <Sparkles class="w-4 h-4" />
                    </Button>
                </div>
            </div>
            <div class="space-y-2">
                <Label for="unidade">Unidade</Label>
                <Select v-model="formularioStore.data.unidade">
                    <SelectTrigger id="unidade">
                        <SelectValue placeholder="Selecione uma unidade" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem v-for="unidade in infosProdutos.unidadesMedida" :key="unidade.chave"
                            :value="unidade.chave">
                            {{ unidade.valor }}
                        </SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </div>
        <div class="grid md:grid-cols-3 gap-4">
            <div class="space-y-2">
                <Label for="controlado">Controla estoque</Label>
                <Select v-model="formularioStore.data.controlado">
                    <SelectTrigger id="controlado">
                        <SelectValue placeholder="Selecione o controle" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="sim">
                            Sim
                        </SelectItem>
                        <SelectItem value="nao">
                            Não
                        </SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div class="space-y-2">
                <Label for="produzido">Produzido</Label>
                <Select v-model="formularioStore.data.produzido">
                    <SelectTrigger id="produzido">
                        <SelectValue placeholder="Selecione a produção" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="sim">
                            Sim
                        </SelectItem>
                        <SelectItem value="nao">
                            Não
                        </SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div class="space-y-2">
                <Label for="origem">Origem</Label>
                <Select v-model="formularioStore.data.origem">
                    <SelectTrigger id="origem">
                        <SelectValue placeholder="Selecione a origem" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem v-for="origem in infosProdutos.origemProduto" :key="origem.chave"
                            :value="origem.chave">
                            {{ origem.valor }}
                        </SelectItem>
                    </SelectContent>
                </Select>
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
import { CircleCheck, Sparkles } from "lucide-vue-next";
import { useProdutoFormularioStore } from "@/stores/patrimonio/produtos/produtoFormularioStore";
import { useProdutoStore } from "@/stores/patrimonio/produtos/produtoStore";
import { ProdutoService } from "@/services/patrimonio/produtoService";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectSearchAjax, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CategoriasRepository } from "@/repositories/patrimonio/produtos/categoriasRepository";
import { useInfosProdutoStore } from "@/stores/patrimonio/produtos/infosProdutosStore";
import { gerarCodigoEAN13 } from "@/utils/geradorCodigoBarra";
import { NumberField, NumberFieldContent, NumberFieldDecrement, NumberFieldIncrement, NumberFieldInput } from "@/components/ui/number-field";
const formularioStore = useProdutoFormularioStore();
const mainStore = useProdutoStore();
const infosProdutos = useInfosProdutoStore();

const handleSubmit = async (): Promise<void> => {
    let res = null;
    if (formularioStore.refId == null) res = await ProdutoService.create(formularioStore.data);
    else res = await ProdutoService.update(formularioStore.refId, formularioStore.data);
    if (res) {
        formularioStore.isModalOpen = false;
        await mainStore.getProdutos();
    }
};

const generateCodigoBarra = async () => {
    let res = gerarCodigoEAN13();
    formularioStore.data.codigoBarra = res as string;
}

const fetchUsuarios = async (query: string, id?: number) => {
    if (id) {
        return await CategoriasRepository.get(id).then(response => {
            return [{ id: response.id as number, label: response.categoria }]
        })
    } else {
        return await CategoriasRepository.getAll(10, 1, query).then(response => {
            return response.data.map(item => ({ id: item.id as number, label: item.categoria }))
        })
    }
}
</script>