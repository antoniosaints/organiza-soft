<template>
    <div>
        <Sheet v-model:open="isOpen" @open-change="handleSheetOpenChange">
            <SheetTrigger asChild>
                <Button>
                    <Plus class="mr-2 h-4 w-4" />
                    Nova Venda
                </Button>
            </SheetTrigger>
            <SheetContent class="w-full sm:w-[calc(100vw-50%)] sm:max-w-[calc(100vw)]" side="right">
                <SheetHeader>
                    <SheetTitle>Nova Venda</SheetTitle>
                </SheetHeader>
                <div class="mt-4 flex flex-col gap-4">
                    <div class="flex flex-col gap-2">
                        <Label for="cliente">Cliente</Label>
                        <Select v-model="cliente">
                            <SelectTrigger id="cliente">
                                <SelectValue placeholder="Selecione o cliente" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem v-for="c in clientes" :key="c.id" :value="c.id">{{ c.nome }}
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div class="flex flex-col gap-2">
                            <Label for="dataVenda">Data da Venda</Label>
                            <Popover>
                                <PopoverTrigger as-child>
                                    <Button variant="outline" :class="cn(
                                        'w-full bg-secondary justify-start text-left font-normal',
                                        !dataVenda && 'text-muted-foreground',
                                    )">
                                        <CalendarIcon class="mr-2 h-4 w-4" />
                                        {{ dataVenda ? df.format(dataVenda.toDate(getLocalTimeZone())) : "Selecione uma data" }}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent class="w-auto p-0">
                                    <Calendar locale="pt-BR" v-model="dataVenda" initial-focus />
                                </PopoverContent>
                            </Popover>
                        </div>
                        <div class="space-y-2 flex flex-col">
                            <Label for="desconto">Desconto</Label>
                            <NumberField :step="0.01" :format-options="{style: 'percent'}" id="age" :default-value="1" v-model.number="desconto" :min="0" :max="1">
                                <NumberFieldContent>
                                <NumberFieldDecrement />
                                <NumberFieldInput class="bg-secondary"/>
                                <NumberFieldIncrement />
                                </NumberFieldContent>
                            </NumberField>
                        </div>
                    </div>
                            <div class="space-y-2">
                                <Label>Adicionar Produtos</Label>
                                <div class="flex space-x-2">
                                    <SelectSearchAjax labelSearch="Selecione uma categoria" v-model="produtoSelecionado" :ajax="fetchUsuarios" />
                                    <NumberField id="age" :default-value="1" v-model.number="quantidade" :min="0">
                                        <NumberFieldContent>
                                        <NumberFieldDecrement />
                                        <NumberFieldInput class="bg-secondary"/>
                                        <NumberFieldIncrement />
                                        </NumberFieldContent>
                                    </NumberField>
                                    <Button @click="adicionarAoCarrinho" :disabled="!produtoSelecionado">
                                        <PlusCircle class="mr-2 h-4 w-4" />
                                        Adicionar
                                    </Button>
                                </div>
                            </div>

                            <!-- Carrinho -->
                            <div v-if="carrinho.length > 0" class="space-y-2">
                                <Label>Itens da venda</Label>
                                <ul class="space-y-2">
                                    <li v-for="item in carrinho" :key="item.id"
                                        class="flex items-center justify-between">
                                        <span>{{ item.nome }} - R$ {{ item.preco.toFixed(2) }}</span>
                                        <div class="flex items-center space-x-2">
                                            <Button size="icon" variant="outline"
                                                @click="atualizarQuantidade(item.id, item.quantidade - 1)">
                                                <MinusCircle class="h-4 w-4" />
                                            </Button>
                                            <span>{{ item.quantidade }}</span>
                                            <Button size="icon" variant="outline"
                                                @click="atualizarQuantidade(item.id, item.quantidade + 1)">
                                                <PlusCircle class="h-4 w-4" />
                                            </Button>
                                            <Button size="icon" variant="destructive"
                                                @click="removerDoCarrinho(item.id)">
                                                <Trash2 class="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </li>
                                </ul>
                            </div>

                            <!-- Descrição -->
                            <div class="space-y-2">
                                <Label for="descricao">Descrição</Label>
                                <Textarea rows="4" id="descricao" v-model="descricao"
                                    placeholder="Adicione uma descrição para a venda" />
                            </div>

                            <div>
                                <div class="text-2xl font-bold">
                                Total: R$ {{calcularTotal().toFixed(2)}}
                                </div>
                                <Button @click=(handleSheetOpenChange(false))>Finalizar Venda</Button>
                            </div>
                </div>
            </SheetContent>
        </Sheet>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { CalendarIcon, MinusCircle, Plus, PlusCircle, Trash2 } from 'lucide-vue-next';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectSearchAjax, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Textarea } from '@/components/ui/textarea';

import { cn } from '@/lib/utils'
import {
  DateFormatter,
  type DateValue,
  getLocalTimeZone,
} from '@internationalized/date'
import { NumberField, NumberFieldContent, NumberFieldDecrement, NumberFieldIncrement, NumberFieldInput } from '@/components/ui/number-field';
import { ProdutosRepository } from '@/repositories/patrimonio/produtos/produtosRepository';

const df = new DateFormatter('pt-BR', {
  dateStyle: 'long',
})
// Dados Simulados
const clientes = [
    { id: '1', nome: 'Cliente A' },
    { id: '2', nome: 'Cliente B' },
    { id: '3', nome: 'Cliente C' }
]
const produtos = [
    { id: '1', nome: 'Produto 1', preco: 10 },
    { id: '2', nome: 'Produto 2', preco: 20 },
    { id: '3', nome: 'Produto 3', preco: 30 }
]

interface IItemCarrinho {
    id: string
    nome: string
    preco: number
    quantidade: number
}
// Dados e Funções Reativas
const isOpen = ref(false)
const cliente = ref('')
const dataVenda = ref<DateValue>()
const desconto = ref(0)
const descricao = ref('')
const carrinho = reactive<IItemCarrinho[]>([])
const produtoSelecionado = ref()
const quantidade = ref(1)

const fetchUsuarios = async (query: string, id?: number) => {
    if (id) {
        return await ProdutosRepository.get(id).then(response => {
            return [{ id: response.id as number, label: response.produto }]
        })
    }else {
        return await ProdutosRepository.getAll(10, 1, query).then(response => {
            return response.data.map(item => ({ id: item.id as number, label: item.produto }))
        })
    }
}
// Métodos
const adicionarAoCarrinho = () => {
    const produto = produtos.find(p => p.id === produtoSelecionado.value)
    if (produto) {
        const itemExistente = carrinho.find(item => item.id === produto.id)
        if (itemExistente) {
            itemExistente.quantidade += quantidade.value
        } else {
            carrinho.push({ id: produto.id, nome: produto.nome, preco: produto.preco, quantidade: quantidade.value })
        }
        produtoSelecionado.value = 0
        quantidade.value = 1
    }
}

const removerDoCarrinho = (id: string) => {
    const index = carrinho.findIndex(item => item.id === id)
    if (index !== -1) carrinho.splice(index, 1)
}

const atualizarQuantidade = (id: string, novaQuantidade: number) => {
    const item = carrinho.find(item => item.id === id)
    if (item) item.quantidade = Math.max(1, novaQuantidade)
}

const calcularTotal = () => {
    const subtotal = carrinho.reduce((total, item) => total + item.preco * item.quantidade, 0)
    return subtotal - (subtotal * desconto.value)
}

const resetForm = () => {
    cliente.value = ''
    desconto.value = 0
    descricao.value = ''
    carrinho.length = 0
    produtoSelecionado.value = ''
    quantidade.value = 1
}

const handleSheetOpenChange = (open: boolean) => {
    isOpen.value = open
    if (open) resetForm()
}
</script>

<style scoped>
/* Estilos podem ser ajustados conforme necessário */
</style>