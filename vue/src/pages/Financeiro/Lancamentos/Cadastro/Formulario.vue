<script setup lang="ts">
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { ArrowDownCircle, ArrowUpCircle, CheckCheck, PiggyBank } from 'lucide-vue-next'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Textarea } from '@/components/ui/textarea'
import { ScrollArea } from '@/components/ui/scroll-area'
import { NumberField, NumberFieldContent, NumberFieldDecrement, NumberFieldIncrement, NumberFieldInput } from '@/components/ui/number-field'
import { useLancamentoSchemaStore } from '@/stores/financeiro/lancamentos/lancamentoSchemaStore'
import { LancamentoService } from '@/services/financeiro/LancamentoService'
import { computed, watch } from 'vue'
import { useColorMode } from '@vueuse/core'
import { ModalFormularioCategoria } from '../../Categorias/Cadastro'
import { namesOfWeekDatePicker } from '@/utils/datepickerUtil'
import { useLoginStore } from '@/stores/login/loginStore'
import { errors as errorsLancamento, checkDataLancamento } from '@/schemas/financeiro/lancamentoSchema'
import { createCategoriaLancamento, getCategoriasLancamento } from './dataCategoria'
import SelectAjax from '@/components/customs/SelectAjax.vue'
import { createContaLancamento, getContasLancamento } from './dataContas'
import { createClienteLancamento, getClientesLancamento } from './dataCliente'
import { Autorize } from '@/autorization'
const colorMode = useColorMode()
const { schema } = useLancamentoSchemaStore()
const loginStore = useLoginStore()
const canCreateClienteLancamento = Autorize.can("criar", "clientes")!
const canCreateContaLancamento = Autorize.can("criar", "contas_lancamentos")!;
const canCreateCategoria = Autorize.can("criar", "categorias_lancamentos")!;

const canLancamentoRetroativo = computed(() => {
    return !!loginStore.dataUserInfosLogged?.lancamentosRetroativos
})

schema.lancamento.usuarioLancamento = loginStore.dataUserInfosLogged?.id

const managerState = () => {
    if (schema.isParcelado) schema.isEfetivado = false
    else schema.hasEntrada = false
    if (schema.isEfetivado) {
        schema.isParcelado = false
        schema.hasEntrada = false
    }
}

watch(() => [schema.isParcelado, schema.isEfetivado], managerState)

const isDark = computed(() => colorMode.value === 'dark');

const submitLancamento = async () => {
    if (!checkDataLancamento(schema.lancamento)) {
        return
    }
    await LancamentoService.create(schema)
}
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
            <form class="space-y-2" @submit.prevent="submitLancamento">
                <TabsContent value="dados_principais">
                    <ScrollArea class="space-y-2 h-[calc(100vh-18rem)]">
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
                            <div class="space-y-2 p-2">
                                <Label for="tipo_lancamento">Tipo de lançamento</Label>
                                <RadioGroup
                                    @update:modelValue="schema.lancamento.natureza = $event as 'despesa' | 'receita'"
                                    class="grid grid-cols-2 gap-4">
                                    <div>
                                        <RadioGroupItem value="receita" id="receita" class="peer sr-only" />
                                        <Label :for="'receita'"
                                            class="flex items-center cursor-pointer justify-between rounded-md border border-muted bg-popover p-2 hover:bg-green-200 hover:dark:bg-green-700 hover:text-accent-foreground peer-checked:border-muted"
                                            :class="{ 'bg-green-100 dark:bg-green-700': schema.lancamento.natureza === 'receita' }">
                                            <ArrowUpCircle class="h-5 w-5 text-emerald-600 dark:text-green-400" />
                                            <span class="font-semibold">Receita</span>
                                        </Label>
                                    </div>
                                    <div>
                                        <RadioGroupItem value="despesa" id="despesa" class="peer sr-only" />
                                        <Label :for="'despesa'"
                                            class="flex items-center cursor-pointer justify-between rounded-md border border-muted bg-popover p-2 hover:bg-red-200 hover:dark:bg-red-700 hover:text-accent-foreground peer-checked:border-muted"
                                            :class="{ 'bg-red-100 dark:bg-red-700': schema.lancamento.natureza === 'despesa' }">
                                            <ArrowDownCircle class="h-5 w-5 text-red-600 dark:text-red-400" />
                                            <span class="font-semibold">Despesa</span>
                                        </Label>
                                    </div>
                                </RadioGroup>
                            </div>
                            <div class="grid grid-cols-1 md:grid-cols-2">
                                <div class="space-y-2 p-2">
                                    <Label for="valorTransacao">Valor</Label>
                                    <NumberField required id="valorTransacao" :format-options="{
                                        style: 'currency',
                                        currency: 'BRL',
                                        maximumFractionDigits: 2,
                                        compactDisplay: 'short',
                                        notation: 'standard',
                                        currencyDisplay: 'narrowSymbol',
                                        currencySign: 'accounting',
                                    }" :step="0.01" :default-value="0.01" v-model="schema.valorLancamento" :min="0.01">
                                        <NumberFieldContent>
                                            <NumberFieldDecrement />
                                            <NumberFieldInput />
                                            <NumberFieldIncrement />
                                        </NumberFieldContent>
                                    </NumberField>
                                </div>
                                <div class="space-y-2 p-2">
                                    <Label for="primeiroVencimento">Data vencimento</Label>
                                    <VueDatePicker :min-date="!canLancamentoRetroativo ? new Date() : null"
                                        :day-names="namesOfWeekDatePicker" placeholder="Data do vencimento"
                                        id="primeiroVencimento" required :dark="isDark"
                                        v-model="schema.lancamento.dataVencimento" format="dd/MM/yyyy" locale="pt"
                                        auto-apply utc />
                                </div>
                            </div>
                        </div>
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-2">
                            <div class="space-y-2 p-2">
                                <Label for="conta">Conta </Label>
                                <SelectAjax :can-create="canCreateContaLancamento" v-model="(schema.lancamento.contaId as number)" :create-option="createContaLancamento"
                                    :load-options="getContasLancamento" />
                                <span class="text-sm ml-2 text-red-500" v-if="errorsLancamento.contaId">{{ errorsLancamento.contaId }}</span>
                            </div>
                            <div class="space-y-2 p-2">
                                <Label for="categoria">Categoria</Label>
                                <SelectAjax :can-create="canCreateCategoria" v-model="(schema.lancamento.categoriaId as number)" :create-option="createCategoriaLancamento"
                                    :load-options="getCategoriasLancamento" />
                                    <span class="text-sm ml-2 text-red-500" v-if="errorsLancamento.categoriaId">{{ errorsLancamento.categoriaId }}</span>
                            </div>
                            <div class="space-y-2 p-2">
                                <Label for="fornecedor">Cliente / Fornecedor</Label>
                                <SelectAjax clearable :can-create="canCreateClienteLancamento" v-model="(schema.lancamento.fornecedorId as number)" :create-option="createClienteLancamento"
                                    :load-options="getClientesLancamento" />
                            </div>
                        </div>
                        <div class="space-y-2 p-2">
                            <Label for="descricao">Descrição do lançamento</Label>
                            <Textarea v-model="schema.lancamento.descricao" required id="descricao" rows="4"
                                placeholder="Adicione uma descrição." />
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
                                <Switch id="parcelado" :checked="schema.isParcelado"
                                    @update:checked="schema.isParcelado = $event" />
                            </div>
                            <div v-if="!schema.isParcelado" class="flex items-center space-x-4 rounded-md border p-4">
                                <CheckCheck />
                                <div class="flex-1 space-y-1">
                                    <p class="text-sm font-medium leading-none">
                                        Lançar efetivado
                                    </p>
                                    <p class="text-sm text-muted-foreground">
                                        Realiza o lançamento com status efetivado
                                    </p>
                                </div>
                                <Switch id="efetivado" :checked="schema.isEfetivado"
                                    @update:checked="schema.isEfetivado = $event" />
                            </div>
                            <div v-if="schema.isParcelado" class="flex items-center space-x-4 rounded-md border p-4">
                                <CheckCheck />
                                <div class="flex-1 space-y-1">
                                    <p class="text-sm font-medium leading-none">
                                        Entrada
                                    </p>
                                    <p class="text-sm text-muted-foreground">
                                        Defina o valor de entrada
                                    </p>
                                </div>
                                <Switch id="entrada" :checked="schema.hasEntrada"
                                    @update:checked="schema.hasEntrada = $event" />
                            </div>
                        </div>
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-2" v-if="schema.isParcelado">
                            <div class="space-y-2 p-2">
                                <Label for="quantidadeParcelas">Quantidade de Parcelas</Label>
                                <NumberField id="quantidadeParcelas" :step="1" :default-value="1"
                                    :required="schema.isParcelado" v-model="schema.quantidadeParcelas" :min="1">
                                    <NumberFieldContent>
                                        <NumberFieldDecrement />
                                        <NumberFieldInput />
                                        <NumberFieldIncrement />
                                    </NumberFieldContent>
                                </NumberField>
                            </div>
                            <div class="space-y-2 p-2">
                                <Label for="quantidadeParcelas">Período de cobrança</Label>
                                <Select v-model="schema.periodo" defaultValue="mes" :required="schema.isParcelado">
                                    <SelectTrigger id="tipoPagamento">
                                        <SelectValue placeholder="Selecione o período" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="mes">Mensal</SelectItem>
                                        <SelectItem value="semana">Semanal</SelectItem>
                                        <SelectItem value="ano">Anual</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div class="space-y-2 p-2">
                                <Label for="primeiroVencimento">Data Primeira Parcela</Label>
                                <VueDatePicker :min-date="!canLancamentoRetroativo ? new Date() : null"
                                    :day-names="namesOfWeekDatePicker" placeholder="Data da primeira parcela"
                                    id="primeiroVencimento" :required="schema.isParcelado" :dark="isDark"
                                    v-model="schema.dataPrimeiraParcela" format="dd/MM/yyyy" locale="pt" auto-apply
                                    utc />
                            </div>
                        </div>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-2" v-if="schema.hasEntrada">
                            <div class="space-y-2 p-2">
                                <Label for="quantidadeParcelas">Valor da entrada</Label>
                                <NumberField id="quantidadeParcelas" :format-options="{
                                    style: 'currency',
                                    currency: 'BRL',
                                    maximumFractionDigits: 2,
                                    compactDisplay: 'short',
                                    notation: 'standard',
                                    currencyDisplay: 'narrowSymbol',
                                    currencySign: 'standard',
                                }" :step="0.01" :default-value="1" :required="schema.hasEntrada"
                                    v-model="schema.valorEntrada" :min="0.01">
                                    <NumberFieldContent>
                                        <NumberFieldDecrement />
                                        <NumberFieldInput />
                                        <NumberFieldIncrement />
                                    </NumberFieldContent>
                                </NumberField>
                            </div>
                            <div class="space-y-2 p-2">
                                <Label for="primeiroVencimento">Data da entrada</Label>
                                <VueDatePicker :day-names="namesOfWeekDatePicker"
                                    placeholder="Selecione a data da entrada" id="primeiroVencimento"
                                    :required="schema.hasEntrada" :dark="isDark" v-model="schema.dataEntrada"
                                    format="dd/MM/yyyy" locale="pt" auto-apply utc />
                            </div>
                        </div>
                        <div v-if="schema.isEfetivado" class="grid grid-cols-1 md:grid-cols-2 gap-2">
                            <div class="space-y-2 p-2">
                                <Label for="dataPagamento">Data do Pagamento</Label>
                                <VueDatePicker :day-names="namesOfWeekDatePicker" :max-date="new Date()"
                                    placeholder="Selecione a data do pagamento" id="dataPagamento"
                                    :required="schema.isEfetivado" :dark="isDark" v-model="schema.dataPagamento"
                                    format="dd/MM/yyyy" locale="pt" auto-apply utc />
                            </div>
                            <div class="space-y-2 p-2">
                                <Label for="tipoPagamento">Tipo de Pagamento</Label>
                                <Select v-model="schema.lancamento.metodoPagamento" :required="schema.isEfetivado">
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
                                <Input id="codigoNfe" v-model="schema.lancamento.codigoNfe" type="text"
                                    placeholder="Nota fiscal" />
                            </div>

                            <div class="space-y-2 p-2">
                                <Label for="referenciaExterna">Referência externa</Label>
                                <Input id="referenciaExterna" v-model="schema.lancamento.referenciaExterna" type="text"
                                    placeholder="Referência externa" />
                            </div>
                        </div>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
                            <div class="space-y-2 p-2">
                                <Label for="codigoServico">Código do serviço</Label>
                                <Input id="codigoServico" v-model="schema.lancamento.codigo_servico" type="text"
                                    placeholder="Código do serviço" />
                            </div>

                            <div class="space-y-2 p-2">
                                <Label for="taxaJuros">Taxa de juros</Label>
                                <NumberField id="taxaJuros" :format-options="{ style: 'percent', minimumFractionDigits: 2 }" :step="0.0001"
                                    :default-value="0" v-model="schema.lancamento.taxaJuros" :min="0">
                                    <NumberFieldContent>
                                        <NumberFieldDecrement />
                                        <NumberFieldInput />
                                        <NumberFieldIncrement />
                                    </NumberFieldContent>
                                </NumberField>
                            </div>
                        </div>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
                            <div class="space-y-2 p-2">
                                <Label for="taxaCambio">Taxa de cambio</Label>
                                <NumberField id="taxaCambio" :format-options="{ style: 'percent', minimumFractionDigits: 2 }" :step="0.0001"
                                    :default-value="0" v-model="schema.lancamento.taxaCambio" :min="0">
                                    <NumberFieldContent>
                                        <NumberFieldDecrement />
                                        <NumberFieldInput />
                                        <NumberFieldIncrement />
                                    </NumberFieldContent>
                                </NumberField>
                            </div>

                            <div class="space-y-2 p-2">
                                <Label for="taxaDesconto">Taxa de desconto</Label>
                                <NumberField id="taxaDesconto" :format-options="{ style: 'percent', minimumFractionDigits: 2 }" :step="0.0001"
                                    :default-value="0" v-model="schema.lancamento.taxaDesconto" :min="0">
                                    <NumberFieldContent>
                                        <NumberFieldDecrement />
                                        <NumberFieldInput />
                                        <NumberFieldIncrement />
                                    </NumberFieldContent>
                                </NumberField>
                            </div>
                        </div>
                    </ScrollArea>
                </TabsContent>
                <Button type="submit" class="w-full">Salvar Lançamento</Button>
            </form>
            <ModalFormularioCategoria />
        </Tabs>
    </div>
</template>
