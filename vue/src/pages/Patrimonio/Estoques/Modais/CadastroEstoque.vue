<template>
    <Dialog v-model="isOpen">
        <DialogTrigger as-child>
            <Button size="sm" variant="default">
                <Package class="mr-1 h-4 w-4" />
                Novo estoque
            </Button>
        </DialogTrigger>
        <DialogContent class="sm:max-w-xl">
            <DialogHeader>
                <DialogTitle>Adicionar Novo Estoque</DialogTitle>
            </DialogHeader>
            <form @submit.prevent="handleSubmit">
                <div class="grid grid-cols-2 py-4 gap-4">
                    <div class="flex flex-col gap-4">
                        <Label for="stockName">Nome do Estoque</Label>
                        <Input id="stockName" placeholder="Nome do estoque" v-model="stockName" />
                    </div>
                    <div class="flex flex-col gap-4">
                        <Label for="product">Produto</Label>
                        <SelectAjax v-model="product" :load-options="getProdutos" />
                    </div>
                    <div class="flex flex-col gap-4">
                        <Label for="warehouse">Armazém</Label>
                        <Input id="warehouse" placeholder="Armazém" v-model="warehouse" />
                    </div>
                    <div class="flex flex-col gap-4">
                        <Label for="minStock">Estoque Mínimo</Label>
                        <Input id="minStock" placeholder="Estoque mínimo" type="number" v-model="minStock" />
                    </div>
                    <div class="flex flex-col gap-4 col-span-2">
                        <Label for="descricao">Descrição</Label>
                        <Textarea id="descricao" v-model="descricao" placeholder="Descrição do estoque." />
                    </div>
                    <div class="flex items-center space-x-2">
                        <div class="flex items-center w-full justify-between bg-card px-4 py-2 rounded-lg">
                            <div class="space-y-0.5">
                                <Label htmlFor="permiteMostrarNoPdv" class="flex items-center">
                                    <ShoppingCart class="w-4 h-4 mr-2" />
                                    Mostrar no PDV
                                </Label>
                                <p class="text-xs text-muted-foreground">Mostrar o estoque no PDV para venda de produtos!</p>
                            </div>
                            <Switch id="permiteMostrarNoPdv" v-model:checked="visibleInPOS" />
                        </div>
                    </div>
                    <div class="flex items-center space-x-2">
                        <div class="flex items-center w-full justify-between bg-card px-4 py-2 rounded-lg">
                            <div class="space-y-0.5">
                                <Label htmlFor="controlarEstoqueProduto" class="flex items-center">
                                    <PackageSearch class="w-4 h-4 mr-2" />
                                    Controlar estoque
                                </Label>
                                <p class="text-xs text-muted-foreground">Controlar o estoque do produto e notifica em baixas!</p>
                            </div>
                            <Switch id="controlarEstoqueProduto" v-model:checked="visibleInPOS" />
                        </div>
                    </div>
                </div>
                <div class="text-right">
                    <Button type="submit" class="mt-4">
                        <CircleCheck class="w-4 h-4 mr-2" />
                        Salvar
                    </Button>
                </div>
            </form>
        </DialogContent>
    </Dialog>
</template>

<script setup lang="ts">
import SelectAjax from '@/components/customs/SelectAjax.vue';
import { SetOptions } from '@/components/customs/selectAjaxUtils';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { ProdutosRepository } from '@/repositories/patrimonio/produtos/produtosRepository';
import { IPatrimonioProduto } from '@/types/patrimonio/IPatrimonioProduto';
import { CircleCheck, Package, PackageSearch, ShoppingCart } from 'lucide-vue-next';
import { ref } from 'vue'

const isOpen = ref(true)
const stockName = ref('')
const product = ref('')
const warehouse = ref('')
const descricao = ref('')
const minStock = ref('')
const visibleInPOS = ref(false)

async function getProdutos(
    query: string,
    getOption: number | null = null,
    setOptions: SetOptions,
): Promise<void> {
    if (getOption) {
        const response = await ProdutosRepository.get(getOption);
        setOptions([{ value: response.id as number, label: response.produto }]);
    } else {
        const response = await ProdutosRepository.getAll(10, 1, query);
        setOptions(response.data.map((item: IPatrimonioProduto) => ({ value: item.id as number, label: item.produto })));
    }
}

const handleSubmit = () => {
    console.log({
        stockName: stockName.value,
        product: product.value,
        warehouse: warehouse.value,
        minStock: minStock.value,
        visibleInPOS: visibleInPOS.value
    })
    isOpen.value = false
}
</script>