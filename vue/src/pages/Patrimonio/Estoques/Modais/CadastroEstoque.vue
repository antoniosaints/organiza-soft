<template>
    <Dialog v-model="isOpen">
        <DialogTrigger as-child>
            <Button size="sm" variant="default">
                <Package class="mr-1 h-4 w-4" />
                Novo estoque
            </Button>
        </DialogTrigger>
        <DialogContent class="sm:max-w-[425px]">
            <DialogHeader>
                <DialogTitle>Adicionar Novo Estoque</DialogTitle>
            </DialogHeader>
            <form @submit.prevent="handleSubmit" class="grid gap-4 py-4">
                <div class="flex flex-col gap-4">
                    <Label for="stockName">Nome do Estoque</Label>
                    <Input id="stockName" v-model="stockName" />
                </div>
                <div class="flex flex-col gap-4">
                    <Label for="product">Produto</Label>
                    <Input id="product" v-model="product" />
                </div>
                <div class="flex flex-col gap-4">
                    <Label for="warehouse">Armazém</Label>
                    <Input id="warehouse" v-model="warehouse" />
                </div>
                <div class="flex flex-col gap-4">
                    <Label for="minStock">Estoque Mínimo</Label>
                    <Input id="minStock" type="number" v-model="minStock" />
                </div>
                <div class="flex items-center space-x-2">
                    <div class="flex items-center w-full justify-between bg-card px-4 py-2 rounded-lg">
                        <div class="space-y-0.5">
                            <Label htmlFor="permiteMostrarNoPdv">Mostrar no PDV</Label>
                            <p class="text-sm text-muted-foreground">Permite mostrar o estoque no PDV</p>
                        </div>
                        <Switch id="permiteMostrarNoPdv" v-model:checked="visibleInPOS" />
                    </div>
                </div>
                <Button type="submit" class="mt-4">Salvar</Button>
            </form>
        </DialogContent>
    </Dialog>
</template>

<script setup>
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Package } from 'lucide-vue-next';
import { ref } from 'vue'

const isOpen = ref(true)
const stockName = ref('')
const product = ref('')
const warehouse = ref('')
const minStock = ref('')
const visibleInPOS = ref(false)

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