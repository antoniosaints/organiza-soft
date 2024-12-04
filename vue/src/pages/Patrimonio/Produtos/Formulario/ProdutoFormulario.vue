<template>
    <form @submit.prevent="handleSubmit" class="space-y-4">
        <div class="space-y-2">
            <Label for="produto">Produto</Label>
            <Input id="produto" placeholder="Nome do produto" minlength="2" v-model="formularioStore.data.produto"
                required />
        </div>
        <div class="grid md:grid-cols-2 gap-4">
            <div class="space-y-2">
                <Label for="preco">Preço</Label>
                <NumberField id="preco" required v-model:modelValue="formularioStore.data.preco" :min="0" :step="0.01"
                    :format-options="{
                        style: 'currency',
                        currency: 'BRL',
                        maximumFractionDigits: 2,
                        compactDisplay: 'short',
                        notation: 'compact',
                        currencyDisplay: 'narrowSymbol',
                        currencySign: 'standard',
                    }">
                    <NumberFieldContent>
                        <NumberFieldDecrement />
                        <NumberFieldInput />
                        <NumberFieldIncrement />
                    </NumberFieldContent>
                </NumberField>
            </div>
            <div class="space-y-2">
                <Label for="categoria">Categoria</Label>
                <SelectAjax :can-create="canCreate" v-model="formularioStore.data.categoriaId" :create-option="createCategoria"
                    :load-options="getCategorias" />
                <span class="text-sm ml-2 text-red-500" v-if="errosProduto.categoriaId">{{ errosProduto.categoriaId
                    }}</span>
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
                <Label for="codigoBarra">Código de barra (EAN-13)</Label>
                <div class="flex w-full max-w-sm items-center">
                    <Input class="rounded-none rounded-l-md" id="codigoBarra" type="number" minlength="12"
                        maxlength="13" placeholder="Código de barra" v-model="formularioStore.data.codigoBarra" />
                    <TooltipProvider>
                        <Tooltip :delayDuration="200">
                            <TooltipTrigger as-child>
                                <Button type="button" variant="outline" @click="generateCodigoBarra"
                                    class="w-min flex-1 rounded-none rounded-r-md">
                                    <Sparkles class="w-4 h-4" />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Gerar Código de Barra</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CategoriasRepository } from "@/repositories/patrimonio/produtos/categoriasRepository";
import { useInfosProdutoStore } from "@/stores/patrimonio/produtos/infosProdutosStore";
import { gerarCodigoEAN13 } from "@/utils/geradorCodigoBarra";
import { NumberField, NumberFieldContent, NumberFieldDecrement, NumberFieldIncrement, NumberFieldInput } from "@/components/ui/number-field";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { checkDataProduto, errors as errosProduto } from "@/schemas/patrimonio/produtosSchema";
import SelectAjax from "@/components/customs/SelectAjax.vue";
import { IOptionAjax, SetOptions, SetSelected } from "@/components/customs/selectAjaxUtils";
import { IPatrimonioCategoria } from "@/types/patrimonio/IPatrimonioCategoria";
import { Autorize } from "@/autorization";
const formularioStore = useProdutoFormularioStore();
const mainStore = useProdutoStore();
const infosProdutos = useInfosProdutoStore();
const canCreate = Autorize.can("criar", "categorias_produtos")!;

const handleSubmit = async (): Promise<void> => {
    let res = null;
    if (formularioStore.refId == null) {
        if (!checkDataProduto(formularioStore.data)) return
        res = await ProdutoService.create(formularioStore.data);
    }
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
async function getCategorias(
    query: string,
    getOption: number | null = null,
    setOptions: SetOptions,
): Promise<void> {
    if (getOption) {
        const response = await CategoriasRepository.get(getOption);
        setOptions([{ value: response.id as number, label: response.categoria }]);
    } else {
        const response = await CategoriasRepository.getAll(10, 1, query);
        setOptions(response.data.map((item: IPatrimonioCategoria) => ({ value: item.id as number, label: item.categoria })));
    }
}

async function createCategoria(
    option: IOptionAjax,
    setSelected: SetSelected
): Promise<void> {
    const response = await CategoriasRepository.create({ categoria: option.label, cor: '' });
    setSelected({
        value: response.id as number,
        label: response.categoria,
    });
}
</script>