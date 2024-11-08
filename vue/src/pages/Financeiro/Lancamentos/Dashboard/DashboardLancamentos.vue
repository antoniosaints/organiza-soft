<template>
    <div class="gap-4 grid">
        <div class="grid gap-4 md:grid-cols-2 md:gap-4 lg:grid-cols-4">
                <Card>
                    <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle class="text-sm font-medium">
                            Resumo geral
                        </CardTitle>
                        <DollarSign class="h-4 w-4" />
                    </CardHeader>
                    <CardContent>
                        <div class="text-2xl font-bold text-blue-500">
                            {{ resumoFinanceiro.total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) }}
                        </div>
                        <div class="flex gap-1 text-xs items-center">
                            <ArrowBigDown class="h-4 w-4 text-green-500" />
                            {{ totalReceita.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
                            }}
                            <ArrowBigUp class="h-4 w-4 text-red-500" />
                            {{ totalDespesa.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
                            }}
                        </div>
                    </CardContent>
                </Card>
            <Card>
                <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle class="text-sm font-medium">
                        Balanço
                    </CardTitle>
                    <ChartCandlestick class="h-4 w-4" />
                </CardHeader>
                <CardContent>
                    <div class="text-2xl font-bold" :class="totalReceita - totalDespesa > 0 ? 'text-green-500' : 'text-red-500'">
                        {{ (totalReceita - totalDespesa).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) }}
                    </div>
                    <p class="flex gap-1 text-xs items-center">
                        <CircleArrowOutDownLeft class="h-3 w-3 text-green-500" />
                        {{ 
                        (totalReceita + totalDespesa) > 0 
                            ? ((totalReceita / (totalReceita + totalDespesa)) * 100).toFixed(2) 
                            : 0 
                        }}% receita
                        <CircleArrowOutUpRight class="h-3 w-3 text-red-500" />
                        {{ 
                        (totalReceita + totalDespesa) > 0 
                            ? ((totalDespesa / (totalReceita + totalDespesa)) * 100).toFixed(2) 
                            : 0 
                        }}% despesa
                    </p>
                </CardContent>
            </Card>
                <Card>
                    <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle class="text-sm font-medium">
                            Pendentes
                        </CardTitle>
                        <ClockArrowDown class="h-4 w-4" />
                    </CardHeader>
                    <CardContent>
                        <div class="text-2xl font-bold text-yellow-500">
                            {{ (totalReceitaPendente + totalDespesaPendente).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) }}
                        </div>
                        <div class="flex gap-1 text-xs items-center">
                            <ClockArrowDown class="h-3 w-3 text-green-500" />
                            {{ totalReceitaPendente.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
                            }}
                            <ClockArrowDown class="h-3 w-3 text-red-500" />
                            {{ totalDespesaPendente.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
                            }}
                        </div>
                    </CardContent>
                </Card>
            <Card>
                <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle class="text-sm font-medium">
                        Consolidado
                    </CardTitle>
                    <CircleCheckBig class="h-4 w-4" />
                </CardHeader>
                <CardContent>
                    <div class="text-2xl font-bold text-blue-500">
                        {{ (totalEfetivoDespesa + totalEfetivoReceita).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) }}
                    </div>
                    <div class="flex gap-1 text-xs items-center">
                        <CircleCheckBig class="h-3 w-3 text-green-500" />
                        {{ totalEfetivoReceita.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
                        }}
                        <CircleCheckBig class="h-3 w-3 text-red-500" />
                        {{ totalEfetivoDespesa.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
                        }}
                    </div>
                </CardContent>
            </Card>
        </div>
        <div class="grid gap-4 md:gap-4 lg:grid-cols-2 xl:grid-cols-3">
            <Card class="col-span-1">
                <CardHeader>
                    <CardTitle>Resumo - Forma de pagamento</CardTitle>
                    <CardDescription>Resumo mensal por forma de pagamento</CardDescription>
                </CardHeader>
                <CardContent>
                    <BarChart class="h-48 py-4" :rounded-corners="4" :data="calcularTotalPorMetodoPagamento()"
                        index="index" :categories="['total']" :y-formatter="formateTicketValue"
                        :custom-tooltip="CustomTooltipChart" />
                </CardContent>
            </Card>
            <Card class="col-span-1">
                <CardHeader>
                    <CardTitle>Resumo - Natureza</CardTitle>
                    <CardDescription>Resumo mensal por natureza</CardDescription>
                </CardHeader>
                <CardContent>
                    <BarChart class="h-48 py-4" :rounded-corners="4" :data="data" index="name"
                        :categories="['total', 'meta']" :y-formatter="formateTicketValue" />
                </CardContent>
            </Card>
            <Card class="col-span-1">
                <CardHeader>
                    <CardTitle>Resumo - Categoria</CardTitle>
                    <CardDescription>Resumo mensal por categoria</CardDescription>
                </CardHeader>
                <CardContent>
                    <BarChart class="h-48 py-4" :rounded-corners="4" :data="data" index="name"
                        :categories="['total', 'meta']" :y-formatter="formateTicketValue" />
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
                        <a href="#">
                            Ver tudo
                            <ArrowUpRight class="h-4 w-4" />
                        </a>
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
                            'BRL' }) }}
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    </div>
</template>
<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { ArrowBigDown, ArrowBigUp, ArrowUpRight, ChartCandlestick, CircleArrowOutDownLeft, CircleArrowOutUpRight, CircleCheckBig, ClockArrowDown, DollarSign } from "lucide-vue-next"
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

const vendas = ref<IVenda[]>([])
const vendasRecents = ref<IVenda[]>([])
const resumoFinanceiro = ref<IResumoFinanceiro>({
    efetivadoDespesaAVista: 0,
    efetivadoReceitaAVista: 0,
    pendenteDespesaAVista: 0,
    pendenteReceitaAVista: 0,
    pendentesDespesasAPrazo: 0,
    pendentesReceitasAPrazo: 0,
    efetivadoDespesasAPrazo: 0,
    efetivadoReceitasAPrazo: 0,
    total: 0
})

const totalReceita = computed(() => {
    return resumoFinanceiro.value.efetivadoReceitaAVista + resumoFinanceiro.value.efetivadoReceitasAPrazo + resumoFinanceiro.value.pendenteReceitaAVista + resumoFinanceiro.value.pendentesReceitasAPrazo
})

const totalDespesa = computed(() => {
    return resumoFinanceiro.value.efetivadoDespesaAVista + resumoFinanceiro.value.efetivadoDespesasAPrazo + resumoFinanceiro.value.pendenteDespesaAVista + resumoFinanceiro.value.pendentesDespesasAPrazo
})

const totalReceitaPendente = computed(() => {
    return resumoFinanceiro.value.pendenteReceitaAVista + resumoFinanceiro.value.pendentesReceitasAPrazo
})

const totalDespesaPendente = computed(() => {
    return resumoFinanceiro.value.pendenteDespesaAVista + resumoFinanceiro.value.pendentesDespesasAPrazo
})

const totalEfetivoReceita = computed(() => {
    return resumoFinanceiro.value.efetivadoReceitaAVista + resumoFinanceiro.value.efetivadoReceitasAPrazo
})

const totalEfetivoDespesa = computed(() => {
    return resumoFinanceiro.value.efetivadoDespesaAVista + resumoFinanceiro.value.efetivadoDespesasAPrazo
})

const getVendasResumo = async () => {
    const resultado = await VendasRepository.getAll(1000, 1, '');
    vendas.value = resultado.data
    vendasRecents.value = vendas.value.sort((a: any, b: any) => b.id - a.id).slice(0, 5)
}

const getResumoFinanceiro = async () => {
    const resultado = await LancamentosRepository.getResume()
    resumoFinanceiro.value = resultado
}

onMounted(async () => {
    getVendasResumo()
    getResumoFinanceiro()
})

const formateTicketValue = (value: any) => {
    return typeof value === 'number'
        ? `R$ ${new Intl.NumberFormat('us').format(value).toString()}`
        : ''
}
interface IDataOutput {
    index: string;
    total: number;
}
function calcularTotalPorMetodoPagamento(): IDataOutput[] {
    const totaisPorMetodo: Record<string, number> = {};
    vendas.value.forEach(venda => {
        const metodoPagamento = venda.metodoPagamento || 'Indefinido';
        if (totaisPorMetodo[metodoPagamento]) {
            totaisPorMetodo[metodoPagamento] += (venda.valor - venda.valorDesconto!);
        } else {
            totaisPorMetodo[metodoPagamento] = (venda.valor - venda.valorDesconto!);
        }
    });
    return Object.keys(totaisPorMetodo).map(metodo => ({
        index: metodo,
        total: totaisPorMetodo[metodo],
    }));
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

const data = [
    { name: 'Jan', total: Math.floor(Math.random() * 2000) + 500, meta: Math.floor(Math.random() * 2000) + 500 },
    { name: 'Fev', total: Math.floor(Math.random() * 2000) + 500, meta: Math.floor(Math.random() * 2000) + 500 },
    { name: 'Mar', total: Math.floor(Math.random() * 2000) + 500, meta: Math.floor(Math.random() * 2000) + 500 },
    { name: 'Abr', total: Math.floor(Math.random() * 2000) + 500, meta: Math.floor(Math.random() * 2000) + 500 },
    { name: 'Mar', total: Math.floor(Math.random() * 2000) + 500, meta: Math.floor(Math.random() * 2000) + 500 },
    { name: 'Jun', total: Math.floor(Math.random() * 2000) + 500, meta: Math.floor(Math.random() * 2000) + 500 },
    { name: 'Jul', total: Math.floor(Math.random() * 2000) + 500, meta: Math.floor(Math.random() * 2000) + 500 },
]

</script>