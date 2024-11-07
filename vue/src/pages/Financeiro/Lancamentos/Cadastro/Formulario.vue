<script setup lang="ts">
import { ref } from 'vue'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { ArrowDownCircle, ArrowUpCircle, CalendarIcon, CheckCheck, PiggyBank } from 'lucide-vue-next'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Textarea } from '@/components/ui/textarea'
import {
  DateFormatter,
  type DateValue,
  getLocalTimeZone,
} from '@internationalized/date'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useLancamentosFormularioStore } from '@/stores/financeiro/lancamentos/lancamentosFormularioStore'

const df = new DateFormatter('pt-BR', {
  dateStyle: 'long',
})

const formulario = useLancamentosFormularioStore()

const isParcelado = ref(false)
const isEfetivado = ref(false)
const dataPagamento = ref<DateValue>()
const dataPrimeiroVencimento = ref<DateValue>()

</script>

<template>
    <div>
        <Tabs default-value="dados_principais" class="w-full">
            <TabsList class="grid w-max grid-cols-2">
                <TabsTrigger value="dados_principais">
                    Dados principais
                </TabsTrigger>
                <TabsTrigger value="password">
                    Outras informações
                </TabsTrigger>
            </TabsList>
            <form class="space-y-2">
                <TabsContent value="dados_principais">
                    <ScrollArea class="space-y-2 h-[calc(100vh-18rem)]">
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
                            <div class="space-y-2 p-2">
                                <Label for="tipo_lancamento">Tipo de lançamento</Label>
                                <RadioGroup @update:modelValue="formulario.data.natureza = $event as 'despesa' | 'receita'" class="grid grid-cols-2 gap-4">
                                    <div>
                                        <RadioGroupItem value="receita" id="receita" class="peer sr-only" />
                                        <Label :for="'receita'"
                                            class="flex items-center cursor-pointer justify-between rounded-md border-2 border-muted bg-popover p-2 hover:bg-green-200 hover:dark:bg-green-700 hover:text-accent-foreground peer-checked:border-muted"
                                            :class="{ 'bg-green-100 dark:bg-green-700': formulario.data.natureza === 'receita' }">
                                            <ArrowUpCircle class="h-5 w-5 text-emerald-600 dark:text-green-400" />
                                            <span class="font-semibold">Receita</span>
                                        </Label>
                                    </div>
                                    <div>
                                        <RadioGroupItem value="despesa" id="despesa" class="peer sr-only" />
                                        <Label :for="'despesa'"
                                            class="flex items-center cursor-pointer justify-between rounded-md border-2 border-muted bg-popover p-2 hover:bg-red-200 hover:dark:bg-red-700 hover:text-accent-foreground peer-checked:border-muted"
                                            :class="{ 'bg-red-100 dark:bg-red-700': formulario.data.natureza === 'despesa' }">
                                            <ArrowDownCircle class="h-5 w-5 text-red-600 dark:text-red-400" />
                                            <span class="font-semibold">Despesa</span>
                                        </Label>
                                    </div>
                                </RadioGroup>
                            </div>
                            <div class="space-y-2 p-2">
                                <Label for="valor">Valor</Label>
                                <Input required id="valor" v-model="formulario.data.valor" type="number" placeholder="0,00" step="0.01" />
                            </div>
                        </div>
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-2">
                            <div class="space-y-2 p-2">
                                <Label for="conta">Conta</Label>
                                <Select required>
                                    <SelectTrigger id="conta">
                                        <SelectValue placeholder="Selecione uma conta" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="1">Nubank</SelectItem>
                                        <SelectItem value="2">Caixa da empresa</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div class="space-y-2 p-2">
                                <Label for="categoria">Categoria</Label>
                                <Select required>
                                    <SelectTrigger id="categoria">
                                        <SelectValue placeholder="Selecione uma categoria" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="alimentacao">Alimentação</SelectItem>
                                        <SelectItem value="transporte">Transporte</SelectItem>
                                        <SelectItem value="moradia">Moradia</SelectItem>
                                        <SelectItem value="saude">Saúde</SelectItem>
                                        <SelectItem value="educacao">Educação</SelectItem>
                                        <SelectItem value="lazer">Lazer</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div class="space-y-2 p-2">
                                <Label for="fornecedor">Fornecedor</Label>
                                <Select>
                                    <SelectTrigger id="fornecedor">
                                        <SelectValue placeholder="Selecione um fornecedor" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="fornecedor1">Fornecedor 1</SelectItem>
                                        <SelectItem value="fornecedor2">Fornecedor 2</SelectItem>
                                        <SelectItem value="fornecedor3">Fornecedor 3</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <div class="space-y-2 p-2">
                            <Label for="descricao">Descrição do lançamento</Label>
                            <Textarea required id="descricao" rows="4" placeholder="Adicione uma descrição." />
                        </div>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2 p-2">
                            <div class="flex items-center space-x-4 rounded-md border p-4">
                                <PiggyBank />
                                <div class="flex-1 space-y-1">
                                    <p class="text-sm font-medium leading-none">
                                        Lançar parcelado
                                    </p>
                                    <p class="text-sm text-muted-foreground">
                                        Defina o parcelamento do lançamento
                                    </p>
                                </div>
                                <Switch id="parcelado" :checked="isParcelado" @update:checked="isParcelado = $event" />
                            </div>
                            <div class=" flex items-center space-x-4 rounded-md border p-4">
                                <CheckCheck />
                                <div class="flex-1 space-y-1">
                                    <p class="text-sm font-medium leading-none">
                                        Lançar efetivado
                                    </p>
                                    <p class="text-sm text-muted-foreground">
                                        Defina o efetivado do lançamento
                                    </p>
                                </div>
                                <Switch id="efetivado" :checked="isEfetivado" @update:checked="isEfetivado = $event" />
                            </div>
                        </div>
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-2" v-if="isParcelado">
                            <div class="space-y-2 p-2">
                                <Label for="quantidadeParcelas">Quantidade de Parcelas</Label>
                                <Input id="quantidadeParcelas" :required="isParcelado" type="number" min="1" placeholder="Número de parcelas" />
                            </div>
                            <div class="space-y-2 p-2">
                                <Label for="quantidadeParcelas">Período de cobrança</Label>
                                <Select defaultValue="mensal" :required="isParcelado">
                                    <SelectTrigger id="tipoPagamento">
                                        <SelectValue placeholder="Selecione o período" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="mensal">Mensal</SelectItem>
                                        <SelectItem value="semanal">Semanal</SelectItem>
                                        <SelectItem value="anual">Anual</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div class="space-y-2 p-2">
                                <Label for="primeiroVencimento">Data Primeira Parcela</Label>
                                <Popover>
                                    <PopoverTrigger as="div">
                                        <Button type="button" variant="outline"
                                            class="w-full justify-start text-left font-normal bg-secondary"
                                            :class="{ 'text-muted-foreground': !dataPrimeiroVencimento }">
                                            <CalendarIcon class="mr-2 h-4 w-4" />
                                            <span>{{ dataPrimeiroVencimento ? df.format(dataPrimeiroVencimento.toDate(getLocalTimeZone())) : 'Selecione uma data'
                                                }}</span>
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent class="w-auto p-0">
                                        <Calendar locale="pt-BR" mode="single" v-model="dataPrimeiroVencimento" initialFocus />
                                    </PopoverContent>
                                </Popover>
                            </div>
                        </div>
                        <div v-if="isEfetivado" class="grid grid-cols-1 md:grid-cols-2 gap-2">
                            <div class="space-y-2 p-2">
                                <Label for="dataPagamento">Data do Pagamento</Label>
                                <Popover>
                                    <PopoverTrigger as="div">
                                        <Button type="button" variant="outline"
                                            class="w-full justify-start text-left font-normal bg-secondary"
                                            :class="{ 'text-muted-foreground': !dataPagamento }">
                                            <CalendarIcon class="mr-2 h-4 w-4" />
                                            <span>{{ dataPagamento ? df.format(dataPagamento.toDate(getLocalTimeZone())) : 'Selecione uma data'
                                                }}</span>
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent class="w-auto p-0">
                                        <Calendar locale="pt-BR" mode="single" v-model="dataPagamento" initialFocus />
                                    </PopoverContent>
                                </Popover>
                            </div>
                            <div class="space-y-2 p-2">
                                <Label for="tipoPagamento">Tipo de Pagamento</Label>
                                <Select :required="isEfetivado">
                                    <SelectTrigger id="tipoPagamento">
                                        <SelectValue placeholder="Selecione o tipo de pagamento" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="dinheiro">Dinheiro</SelectItem>
                                        <SelectItem value="pix">Pix</SelectItem>
                                        <SelectItem value="cartao">Cartão de Crédito</SelectItem>
                                        <SelectItem value="transferencia">Transferência Bancária</SelectItem>
                                        <SelectItem value="boleto">Boleto</SelectItem>
                                        <SelectItem value="cheque">Cheque</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </ScrollArea>
                </TabsContent>
                <TabsContent value="password" class="space-y-4">
                    <ScrollArea class="space-y-4 h-[calc(100vh-18rem)]">
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
                            <div class="space-y-2 p-2">
                                <Label for="codigoNfe">Nota Fiscal</Label>
                                <Input id="codigoNfe" type="text" placeholder="Nota fiscal" />
                            </div>
    
                            <div class="space-y-2 p-2">
                                <Label for="referenciaExterna">Referência externa</Label>
                                <Input id="referenciaExterna" type="text" placeholder="Referência externa" />
                            </div>
                        </div>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
                            <div class="space-y-2 p-2">
                                <Label for="codigoServico">Código do serviço</Label>
                                <Input id="codigoServico" type="text" placeholder="Código do serviço" />
                            </div>
    
                            <div class="space-y-2 p-2">
                                <Label for="taxaJuros">Taxa de juros</Label>
                                <Input id="taxaJuros" type="number" placeholder="%" />
                            </div>
                        </div>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
                            <div class="space-y-2 p-2">
                                <Label for="taxaCambio">Taxa de cambio</Label>
                                <Input id="taxaCambio" type="text" placeholder="%" />
                            </div>
    
                            <div class="space-y-2 p-2">
                                <Label for="taxaDesconto">Taxa de desconto</Label>
                                <Input id="taxaDesconto" type="number" placeholder="%" />
                            </div>
                        </div>
                    </ScrollArea>
                </TabsContent>
                <Button type="submit" class="w-full">Salvar Lançamento</Button>
            </form>
        </Tabs>
    </div>
</template>
