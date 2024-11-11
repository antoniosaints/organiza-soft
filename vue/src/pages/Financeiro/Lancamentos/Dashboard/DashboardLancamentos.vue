<template>
    <div class="gap-4 grid">
        <div class="flex items-center justify-between">
            <div class="text-left mb-2">
                <h2 class="text-2xl font-semibold">Resumo financeiro 💰</h2>
                <p class="text-sm text-muted-foreground">Acompanhe o seu desempenho financeiro.</p>
            </div>
            <div class="flex items-center gap-2 md:w-1/3 lg:w-1/4">
                <VueDatePicker placeholder="Período de filtragem" format="dd/MM/yyyy" select-text="Aplicar"
                    cancel-text="Fechar" :preset-dates="presetsDatePickerVue" locale="pt" :dark="isDark"
                    utc v-model="dateFilter" range>
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
                    <div class="text-2xl font-bold text-blue-500">
                        {{ formatRealValue(totalReceita + totalDespesa) }}
                    </div>
                    <div class="flex gap-1 text-xs items-center">
                        <ArrowBigDown class="h-4 w-4 text-green-500" />
                        {{ formatRealValue(totalReceita) }}
                        <ArrowBigUp class="h-4 w-4 text-red-500" />
                        {{ formatRealValue(totalDespesa) }}
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
                                    O Balanço mostra o saldo subtraindo as receitas efetivadas das despesas efetivadas, mostrando o saldo em
                                <span class="text-green-500 inline">verde</span> quando positivo e <span class="text-red-500 inline">vermelho</span> quando negativo e abaixo a
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
                    <div class="text-2xl font-bold text-yellow-500">
                        {{ formatRealValue(totalReceitaPendente + totalDespesaPendente) }}
                    </div>
                    <div class="flex gap-1 text-xs items-center">
                        <ClockArrowDown class="h-3 w-3 text-green-500" />
                        {{ formatRealValue(totalReceitaPendente) }}
                        <ClockArrowDown class="h-3 w-3 text-red-500" />
                        {{ formatRealValue(totalDespesaPendente) }}
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
                    <div class="text-2xl font-bold text-blue-500">
                        {{ formatRealValue(totalEfetivoDespesa + totalEfetivoReceita) }}
                    </div>
                    <div class="flex gap-1 text-xs items-center">
                        <CircleCheckBig class="h-3 w-3 text-green-500" />
                        {{ formatRealValue(totalEfetivoReceita) }}
                        <CircleCheckBig class="h-3 w-3 text-red-500" />
                        {{ formatRealValue(totalEfetivoDespesa) }}
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
                    <BarChart class="h-48 py-4" :rounded-corners="4"
                        :data="resumoFinanceiro.chart.resumoPorFormaPagamento" :custom-tooltip="CustomTooltipChart"
                        index="name" :categories="['total', 'pendente', 'pago']"
                        :colors="['#3b82f6', '#ef4444', '#22c55e']" />
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
                    <BarChart class="h-48 py-4" :rounded-corners="4" :data="resumoFinanceiro.chart.resumoPorCategoria"
                        :custom-tooltip="CustomTooltipChart" index="name" :categories="['total', 'pendente', 'pago']"
                        :colors="['#3b82f6', '#ef4444', '#22c55e']" />
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
                    <BarChart class="h-48 py-4" :rounded-corners="4" :data="resumoFinanceiro.chart.resumoPorMes"
                        :custom-tooltip="CustomTooltipChart" index="name" :categories="['receita', 'despesa']"
                        :colors="['#22c55e', '#ef4444']" />
                </CardContent>
            </Card>
            <Card class="xl:col-span-2">
                <CardHeader class="flex flex-row items-center">
                    <div class="grid gap-2">
                        <CardTitle>Transações</CardTitle>
                        <CardDescription>
                            Veja seus lançamentos recentes
                        </CardDescription>
                    </div>
                    <Button as-child size="sm" class="ml-auto gap-1">
                        <RouterLink to="/app/financeiro/lancamentos">
                            Ver tudo
                            <ArrowUpRight class="h-4 w-4" />
                        </RouterLink>
                    </Button>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Cliente</TableHead>
                                <TableHead class="hidden xl:table-cell">
                                    Tipo
                                </TableHead>
                                <TableHead class="hidden xl:table-cell">
                                    Status
                                </TableHead>
                                <TableHead class="hidden xl:table-cell">
                                    Data
                                </TableHead>
                                <TableHead class="text-right">
                                    Valor
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow>
                                <TableCell>
                                    <div class="font-medium">
                                        Liam Johnson
                                    </div>
                                    <div class="hidden text-sm text-muted-foreground md:inline">
                                        liam@example.com
                                    </div>
                                </TableCell>
                                <TableCell class="hidden xl:table-cell">
                                    Sale
                                </TableCell>
                                <TableCell class="hidden xl:table-cell">
                                    <Badge class="text-xs" variant="outline">
                                        Approved
                                    </Badge>
                                </TableCell>
                                <TableCell class="hidden md:table-cell lg:hidden xl:table-cell">
                                    2023-06-23
                                </TableCell>
                                <TableCell class="text-right">
                                    $250.00
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Vendas recentes</CardTitle>
                </CardHeader>
                <CardContent class="grid gap-8">
                    <div v-for="sale in vendasRecents" :key="sale.id" class="flex items-center gap-4">
                        <Avatar class="hidden h-9 w-9 sm:flex">
                            <AvatarImage src="/avatars/01.png" alt="Avatar" />
                            <AvatarFallback>{{ sale.Cliente?.nome.slice(0, 2).toUpperCase() }}</AvatarFallback>
                        </Avatar>
                        <div class="grid gap-1">
                            <p class="text-sm font-medium leading-none">
                                {{ sale.Cliente?.nome }}
                            </p>
                            <p class="text-sm text-muted-foreground">
                                {{ sale.Cliente?.email }}
                            </p>
                        </div>
                        <div class="ml-auto font-medium">
                            {{ (sale.valor - sale.valorDesconto!).toLocaleString('pt-BR', {
                                style: 'currency', currency:
                                    'BRL'
                            }) }}
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    </div>
</template>
<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import { ArrowBigDown, ArrowBigUp, ArrowUpRight, ChartCandlestick, CircleArrowOutDownLeft, CircleArrowOutUpRight, CircleCheckBig, CircleHelp, ClockArrowDown, DollarSign } from "lucide-vue-next"
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { BarChart } from '@/components/ui/chart-bar'
import VendasRepository from "@/repositories/vendas/vendasRepository";
import { IVenda } from "@/types/vendas/IVenda";
import CustomTooltipChart from "@/components/customs/CustomTooltipChart.vue";
import { IResumoFinanceiro } from "@/types/financeiro/IResumoFinanceiro";
import LancamentosRepository from "@/repositories/financeiro/lancamentosRepository";
import { formatRealValue } from "@/utils/formatterUtil";
import { RouterLink } from "vue-router";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useColorMode } from "@vueuse/core";
import { presetsDatePickerVue } from "@/utils/datepickerUtil";

const vendas = ref<IVenda[]>([])
const vendasRecents = ref<IVenda[]>([])
const dateFilter = ref<string[]>([])

const isDark = computed(() => useColorMode().value === 'dark')
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
    chart: {
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

const getVendasResumo = async () => {
    const resultado = await VendasRepository.getAll(1000, 1, '');
    vendas.value = resultado.data
    vendasRecents.value = vendas.value.sort((a: any, b: any) => b.id - a.id).slice(0, 5)
}

const getResumoFinanceiro = async () => {
    const resultado = await LancamentosRepository.getResume(dateFilter.value);
    resumoFinanceiro.value = resultado
}

onMounted(async () => {
    await getVendasResumo()
    await getResumoFinanceiro()
    console.log(resumoFinanceiro.value)
})

watch(dateFilter, async () => {
    await getResumoFinanceiro()
})

interface IDataOutput {
    index: string;
    total: number;
}

function calcularTotalPorMes(): IDataOutput[] {
    const totaisPorMes: Record<string, number> = {};

    vendas.value.forEach(venda => {
        // Extrair o mês e ano do campo dataCriacao
        const dataCriacao = new Date(venda.dataCriacao!);
        const mesAno = `${dataCriacao.getMonth() + 1}/${dataCriacao.getFullYear()}`; // Formato "MM-AAAA"

        if (totaisPorMes[mesAno]) {
            totaisPorMes[mesAno] += (venda.valor - venda.valorDesconto!);
        } else {
            totaisPorMes[mesAno] = (venda.valor - venda.valorDesconto!);
        }
    });

    return Object.keys(totaisPorMes).map(mes => ({
        index: mes,
        total: totaisPorMes[mes],
    }));
}
calcularTotalPorMes()

</script>