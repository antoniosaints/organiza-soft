<template>
    <div class="gap-4 grid">
        <div v-show="titleDashboard" class="flex items-center justify-between">
            <div class="text-left mb-2">
                <h2 class="text-2xl font-semibold">Resumo financeiro 💰</h2>
                <p class="text-sm text-muted-foreground">Acompanhe o seu desempenho financeiro.</p>
            </div>
            <div class="flex items-center gap-2 md:w-1/3 lg:w-1/4">
                <VueDatePicker placeholder="Período de filtragem" format="dd/MM/yyyy" select-text="Aplicar"
                    cancel-text="Fechar" :preset-dates="presetsDatePickerVue" locale="pt" :dark="darkMode" utc
                    v-model="dateFilter" range>
                    <template #preset-date-range-button="{ label, value, presetDate }">
                        <span role="button" :tabindex="0" @click="presetDate(value)"
                            @keyup.enter.prevent="presetDate(value)" @keyup.space.prevent="presetDate(value)">
                            {{ label }}
                        </span>
                    </template>
                </VueDatePicker>
            </div>
        </div>
        <div class="grid gap-4 md:grid-cols-2 md:gap-4 lg:grid-cols-4">
            <Card>
                <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle class="text-sm font-medium flex items-center">
                        Resumo geral
                        <Popover>
                            <PopoverTrigger>
                                <CircleHelp class="h-4 w-4 ml-2 text-muted-foreground cursor-pointer" />
                            </PopoverTrigger>
                            <PopoverContent class="w-60 flex justify-center items-center gap-2 text-xs"
                                :align="'start'">
                                <p>
                                    O resumo geral mostra o valor total somando receitas e despesas, logo abaixo com um
                                    ícone de seta pra baixo, o valor total de receitas e um ícone de seta pra cima, o
                                    valor total de despesas
                                </p>
                            </PopoverContent>
                        </Popover>
                    </CardTitle>
                    <DollarSign class="h-4 w-4" />
                </CardHeader>
                <CardContent>
                    <div v-if="isLoading">
                        <Skeleton class="h-6 w-32" />
                        <Skeleton class="h-4 mt-2 w-38" />
                    </div>
                    <div v-else>
                        <div class="text-2xl font-bold text-blue-500">
                            {{ formatRealValue(totalReceita + totalDespesa) }}
                        </div>
                        <div class="flex gap-1 text-xs items-center">
                            <ArrowBigDown class="h-4 w-4 text-green-500" />
                            {{ formatRealValue(totalReceita) }}
                            <ArrowBigUp class="h-4 w-4 text-red-500" />
                            {{ formatRealValue(totalDespesa) }}
                        </div>
                    </div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle class="text-sm font-medium flex items-center">
                        Balanço
                        <Popover>
                            <PopoverTrigger>
                                <CircleHelp class="h-4 w-4 ml-2 text-muted-foreground cursor-pointer" />
                            </PopoverTrigger>
                            <PopoverContent class="w-60 flex justify-center items-center gap-2 text-xs"
                                :align="'start'">
                                <p>
                                    O Balanço mostra o saldo subtraindo as receitas efetivadas das despesas efetivadas,
                                    mostrando o saldo em
                                    <span class="text-green-500 inline">verde</span> quando positivo e <span
                                        class="text-red-500 inline">vermelho</span> quando negativo e abaixo a
                                    porcentagem de <span class="text-green-500 inline">receitas</span> e <span
                                        class="text-red-500 inline">
                                        despesas</span>
                                </p>
                            </PopoverContent>
                        </Popover>
                    </CardTitle>
                    <ChartCandlestick class="h-4 w-4" />
                </CardHeader>
                <CardContent>
                    <div v-if="isLoading">
                        <Skeleton class="h-6 w-32" />
                        <Skeleton class="h-4 mt-2 w-38" />
                    </div>
                    <div v-else>
                        <div class="text-2xl font-bold"
                            :class="totalEfetivoReceita - totalEfetivoDespesa > 0 ? 'text-green-500' : 'text-red-500'">
                            {{ formatRealValue(totalEfetivoReceita - totalEfetivoDespesa) }}
                        </div>
                        <p class="flex gap-1 text-xs items-center">
                            <CircleArrowOutDownLeft class="h-3 w-3 text-green-500" />
                            {{
                                (totalEfetivoReceita + totalEfetivoDespesa) > 0
                                    ? ((totalEfetivoReceita / (totalEfetivoReceita + totalEfetivoDespesa)) * 100).toFixed(2)
                                    : 0
                            }}% receita
                            <CircleArrowOutUpRight class="h-3 w-3 text-red-500" />
                            {{
                                (totalEfetivoReceita + totalEfetivoDespesa) > 0
                                    ? ((totalEfetivoDespesa / (totalEfetivoReceita + totalEfetivoDespesa)) * 100).toFixed(2)
                                    : 0
                            }}% despesa
                        </p>
                    </div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle class="text-sm font-medium flex items-center">
                        Pendentes
                        <Popover>
                            <PopoverTrigger>
                                <CircleHelp class="h-4 w-4 ml-2 text-muted-foreground cursor-pointer" />
                            </PopoverTrigger>
                            <PopoverContent class="w-60 flex justify-center items-center gap-2 text-xs"
                                :align="'start'">
                                <p>
                                    Esse cartão mostra os valores pendentes dos lançamentos, tanto receitas quanto
                                    despesas,
                                    mostrando o valor total em
                                    <span class="text-yellow-500 inline">amarelo</span>
                                    e abaixo, mostra o valor referente à cada tipo de lançamento.
                                </p>
                            </PopoverContent>
                        </Popover>
                    </CardTitle>
                    <ClockArrowDown class="h-4 w-4" />
                </CardHeader>
                <CardContent>
                    <div v-if="isLoading">
                        <Skeleton class="h-6 w-32" />
                        <Skeleton class="h-4 mt-2 w-38" />
                    </div>
                    <div v-else>
                        <div class="text-2xl font-bold text-yellow-500">
                            {{ formatRealValue(totalReceitaPendente + totalDespesaPendente) }}
                        </div>
                        <div class="flex gap-1 text-xs items-center">
                            <ClockArrowDown class="h-3 w-3 text-green-500" />
                            {{ formatRealValue(totalReceitaPendente) }}
                            <ClockArrowDown class="h-3 w-3 text-red-500" />
                            {{ formatRealValue(totalDespesaPendente) }}
                        </div>
                    </div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle class="text-sm font-medium flex items-center">
                        Consolidados
                        <Popover>
                            <PopoverTrigger>
                                <CircleHelp class="h-4 w-4 ml-2 text-muted-foreground cursor-pointer" />
                            </PopoverTrigger>
                            <PopoverContent class="w-60 flex justify-center items-center gap-2 text-xs"
                                :align="'start'">
                                <p>
                                    Esse cartão mostra os valores consolidados dos lançamentos, tanto receitas quanto
                                    despesas,
                                    mostrando o valor total em
                                    <span class="text-blue-500 inline">azul</span>
                                    e abaixo, mostra o valor referente à cada tipo de lançamento.
                                </p>
                            </PopoverContent>
                        </Popover>
                    </CardTitle>
                    <CircleCheckBig class="h-4 w-4" />
                </CardHeader>
                <CardContent>
                    <div v-if="isLoading">
                        <Skeleton class="h-6 w-32" />
                        <Skeleton class="h-4 mt-2 w-38" />
                    </div>
                    <div v-else>
                        <div class="text-2xl font-bold text-blue-500">
                            {{ formatRealValue(totalEfetivoDespesa + totalEfetivoReceita) }}
                        </div>
                        <div class="flex gap-1 text-xs items-center">
                            <CircleCheckBig class="h-3 w-3 text-green-500" />
                            {{ formatRealValue(totalEfetivoReceita) }}
                            <CircleCheckBig class="h-3 w-3 text-red-500" />
                            {{ formatRealValue(totalEfetivoDespesa) }}
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
        <div class="grid gap-4 md:gap-4 lg:grid-cols-2 xl:grid-cols-3">
            <Card class="col-span-1">
                <CardHeader>
                    <CardTitle class="flex items-center">
                        Método de pagamento
                        <Popover>
                            <PopoverTrigger>
                                <CircleHelp class="h-4 w-4 ml-2 text-muted-foreground cursor-pointer" />
                            </PopoverTrigger>
                            <PopoverContent class="w-60 flex justify-center items-center gap-2 text-xs"
                                :align="'start'">
                                <p>
                                    Esse gráfico mostra os lançamentos de acordo com o seu método de pagamento,
                                    onde a cor vermelha representa os lançamentos pendentes,
                                    a cor verde representa os lançamentos pagos e a cor azul representa o total de
                                    lançamentos
                                    por Método de pagamento.
                                </p>
                            </PopoverContent>
                        </Popover>
                    </CardTitle>
                    <CardDescription>Resumo mensal por forma de pagamento</CardDescription>
                </CardHeader>
                <CardContent>
                    <CardContentLoading :icon="ChartColumnIcon" :is-loading="isLoading" message="Nenhum lançamento encontrado" :show="resumoFinanceiro.resumo.total > 0">
                        <BarChart class="h-48 py-4" :rounded-corners="4"
                            :data="resumoFinanceiro.graficos.resumoPorFormaPagamento" :custom-tooltip="CustomTooltipChart"
                            index="name" :categories="['total', 'pendente', 'pago']"
                            :colors="['#3b82f6', '#ef4444', '#22c55e']" />
                    </CardContentLoading>
                </CardContent>
            </Card>
            <Card class="col-span-1">
                <CardHeader>
                    <CardTitle class="flex items-center">
                        Categorias
                        <Popover>
                            <PopoverTrigger>
                                <CircleHelp class="h-4 w-4 ml-2 text-muted-foreground cursor-pointer" />
                            </PopoverTrigger>
                            <PopoverContent class="w-60 flex justify-center items-center gap-2 text-xs"
                                :align="'start'">
                                <p>
                                    Esse gráfico mostra os lançamentos de acordo com o sua categoria,
                                    onde a cor vermelha representa os lançamentos pendentes,
                                    a cor verde representa os lançamentos pagos e a cor azul representa o total de
                                    lançamentos
                                    por categoria.
                                </p>
                            </PopoverContent>
                        </Popover>
                    </CardTitle>
                    <CardDescription>Resumo mensal por categoria</CardDescription>
                </CardHeader>
                <CardContent>
                    <CardContentLoading :icon="ChartColumnIcon" :is-loading="isLoading" message="Nenhum lançamento encontrado" :show="resumoFinanceiro.resumo.total > 0">
                        <BarChart class="h-48 py-4" :rounded-corners="4" :data="resumoFinanceiro.graficos.resumoPorCategoria"
                        :custom-tooltip="CustomTooltipChart" index="name" :categories="['total', 'pendente', 'pago']"
                        :colors="['#3b82f6', '#ef4444', '#22c55e']" />
                    </CardContentLoading>
                </CardContent>
            </Card>
            <Card class="col-span-1">
                <CardHeader>
                    <CardTitle class="flex items-center">
                        Resumo mensal
                        <Popover>
                            <PopoverTrigger>
                                <CircleHelp class="h-4 w-4 ml-2 text-muted-foreground cursor-pointer" />
                            </PopoverTrigger>
                            <PopoverContent class="w-60 flex justify-center items-center gap-2 text-xs"
                                :align="'start'">
                                <p>
                                    Esse gráfico mostra os lançamentos por mês, onde a cor verde representa as receitas
                                    e a cor
                                    vermelha representa as despesas.
                                </p>
                            </PopoverContent>
                        </Popover>
                    </CardTitle>
                    <CardDescription>Resumo mensal por natureza</CardDescription>
                </CardHeader>
                <CardContent>
                    <CardContentLoading :icon="ChartColumnIcon" :is-loading="isLoading" message="Nenhum lançamento encontrado" :show="resumoFinanceiro.resumo.total > 0">
                        <BarChart class="h-48 py-4" :rounded-corners="4" :data="resumoFinanceiro.graficos.resumoPorMes"
                        :custom-tooltip="CustomTooltipChart" index="name" :categories="['receita', 'despesa']"
                        :colors="['#22c55e', '#ef4444']" />
                    </CardContentLoading>
                </CardContent>
            </Card>
            <Card class="xl:col-span-2">
                <CardHeader class="flex flex-row items-center">
                    <div class="grid gap-2">
                        <CardTitle>Lançamentos</CardTitle>
                        <CardDescription>
                            Veja seus lançamentos recentes
                        </CardDescription>
                    </div>
                    <Button v-show="loginStore.dataUserInfosLogged?.financeiro" as-child size="sm" class="ml-auto gap-1">
                        <RouterLink to="/app/financeiro/lancamentos">
                            Ver tudo
                            <ArrowUpRight class="h-4 w-4" />
                        </RouterLink>
                    </Button>
                </CardHeader>
                <CardContent>
                    <CardContentLoading :icon="Table2" :is-loading="isLoading" message="Nenhum lançamento encontrado" :show="resumoFinanceiro.ultimoslancamentos.length > 0">
                        <UltimosLancamentos :lancamentos="resumoFinanceiro.ultimoslancamentos" />
                    </CardContentLoading>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle class="flex items-center">
                        Contas
                        <Popover>
                            <PopoverTrigger>
                                <CircleHelp class="h-4 w-4 ml-2 text-muted-foreground cursor-pointer" />
                            </PopoverTrigger>
                            <PopoverContent class="w-60 flex justify-center items-center gap-2 text-xs"
                                :align="'start'">
                                <p>
                                    Um demonstrativo das contas do sistema com seus valores efetivados, pendentes e Total
                                </p>
                            </PopoverContent>
                        </Popover>
                    </CardTitle>
                    <CardDescription>Lista das contas do sistema</CardDescription>
                </CardHeader>
                <CardContent>
                    <CardContentLoading :icon="CreditCard" :is-loading="isLoading" message="Nenhum lançamento encontrado" :show="resumoFinanceiro.resumoContas.length > 0">
                        <ContasLancamentos :contas="resumoFinanceiro.resumoContas" />
                    </CardContentLoading>
                </CardContent>
            </Card>
        </div>
    </div>
</template>
<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import { ArrowBigDown, ArrowBigUp, ArrowUpRight, ChartCandlestick, ChartColumnIcon, CircleArrowOutDownLeft, CircleArrowOutUpRight, CircleCheckBig, CircleHelp, ClockArrowDown, CreditCard, DollarSign, Table2 } from "lucide-vue-next"
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { BarChart } from '@/components/ui/chart-bar'
import CustomTooltipChart from "@/components/customs/CustomTooltipChart.vue";
import { IResumoFinanceiro } from "@/types/financeiro/IResumoFinanceiro";
import LancamentosRepository from "@/repositories/financeiro/lancamentosRepository";
import { formatRealValue } from "@/utils/formatterUtil";
import { RouterLink } from "vue-router";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useColorMode } from "@vueuse/core";
import { presetsDatePickerVue } from "@/utils/datepickerUtil";
import UltimosLancamentos from "./UltimosLancamentos.vue";
import ContasLancamentos from "./ContasLancamentos.vue";
import { useLoginStore } from "@/stores/login/loginStore";
import { Skeleton } from "@/components/ui/skeleton";
import CardContentLoading from "@/components/customs/CardContentLoading.vue";
const loginStore = useLoginStore()
const colormode = useColorMode()
const dateFilter = ref<string[]>([])

defineProps({
    titleDashboard: {
        type: Boolean,
        required: false,
        default: true
    }
})

const isLoading = ref(true)
const darkMode = computed(() => colormode.value === "dark" ? true : false)
const resumoFinanceiro = ref<IResumoFinanceiro>({
    resumo: {
        efetivadoDespesaAVista: 0,
        efetivadoReceitaAVista: 0,
        pendenteDespesaAVista: 0,
        pendenteReceitaAVista: 0,
        pendentesDespesasAPrazo: 0,
        pendentesReceitasAPrazo: 0,
        efetivadoDespesasAPrazo: 0,
        efetivadoReceitasAPrazo: 0,
        total: 0,
    },
    resumoContas: [],
    ultimoslancamentos: [],
    graficos: {
        resumoPorCategoria: [],
        resumoPorFormaPagamento: [],
        resumoPorMes: []
    }
})

const totalReceita = computed(() => {
    return resumoFinanceiro.value.resumo.efetivadoReceitaAVista + resumoFinanceiro.value.resumo.efetivadoReceitasAPrazo + resumoFinanceiro.value.resumo.pendenteReceitaAVista + resumoFinanceiro.value.resumo.pendentesReceitasAPrazo
})

const totalDespesa = computed(() => {
    return resumoFinanceiro.value.resumo.efetivadoDespesaAVista + resumoFinanceiro.value.resumo.efetivadoDespesasAPrazo + resumoFinanceiro.value.resumo.pendenteDespesaAVista + resumoFinanceiro.value.resumo.pendentesDespesasAPrazo
})

const totalReceitaPendente = computed(() => {
    return resumoFinanceiro.value.resumo.pendenteReceitaAVista + resumoFinanceiro.value.resumo.pendentesReceitasAPrazo
})

const totalDespesaPendente = computed(() => {
    return resumoFinanceiro.value.resumo.pendenteDespesaAVista + resumoFinanceiro.value.resumo.pendentesDespesasAPrazo
})

const totalEfetivoReceita = computed(() => {
    return resumoFinanceiro.value.resumo.efetivadoReceitaAVista + resumoFinanceiro.value.resumo.efetivadoReceitasAPrazo
})

const totalEfetivoDespesa = computed(() => {
    return resumoFinanceiro.value.resumo.efetivadoDespesaAVista + resumoFinanceiro.value.resumo.efetivadoDespesasAPrazo
})

const getResumoFinanceiro = async () => {
    isLoading.value = true
    const resultado = await LancamentosRepository.getResume(dateFilter.value);
    resumoFinanceiro.value = resultado
    isLoading.value = false
}

onMounted(async () => {
    await getResumoFinanceiro()
})

watch(dateFilter, async () => {
    await getResumoFinanceiro()
})
</script>