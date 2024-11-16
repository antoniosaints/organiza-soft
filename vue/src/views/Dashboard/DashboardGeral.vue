<template>
    <div class="gap-4 grid">
        <div class="grid gap-4 md:grid-cols-2 md:gap-4 lg:grid-cols-4">
            <RouterLink to="/app/financeiro/dashboard">
                <Card>
                    <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle class="text-sm font-medium">
                            Lançamentos
                        </CardTitle>
                        <DollarSign class="h-4 w-4" />
                    </CardHeader>
                    <CardContent>
                        <div class="text-2xl font-bold text-green-500">
                            {{ formatRealValue(totalReceita + totalDespesa) }}
                        </div>
                        <div class="flex gap-1 text-xs">
                            <ArrowBigDown class="h-4 w-4 text-green-500" />
                            {{ formatRealValue(totalReceita)
                            }}
                            <ArrowBigUp class="h-4 w-4 text-red-500" />
                            {{ formatRealValue(totalDespesa)
                            }}
                        </div>
                    </CardContent>
                </Card>
            </RouterLink>
            <Card>
                <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle class="text-sm font-medium">
                        Assinaturas
                    </CardTitle>
                    <PenTool class="h-4 w-4" />
                </CardHeader>
                <CardContent>
                    <div class="text-2xl font-bold text-cyan-500">
                        <EyeOff class="inline-flex" />
                    </div>
                    <p class="text-xs text-muted-foreground">
                        Sem novas assinaturas
                    </p>
                </CardContent>
            </Card>
            <RouterLink to="/app/vendas/relatorio">
                <Card>
                    <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle class="text-sm font-medium">
                            Vendas
                        </CardTitle>
                        <CreditCard class="h-4 w-4" />
                    </CardHeader>
                    <CardContent>
                        <div class="text-2xl font-bold text-blue-500">
                            {{ formatRealValue(vendas.reduce((total, item) => total + (item.valor -
                                item.valorDesconto!), 0)) }}
                        </div>
                        <p class="text-xs text-muted-foreground">
                            Resumo das vendas
                        </p>
                    </CardContent>
                </Card>
            </RouterLink>
            <Card>
                <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle class="text-sm font-medium">
                        Clientes
                    </CardTitle>
                    <UsersRound class="h-4 w-4" />
                </CardHeader>
                <CardContent>
                    <div class="text-2xl font-bold text-blue-500">
                        <EyeOff class="inline-flex" />
                    </div>
                    <p class="text-xs text-muted-foreground">
                        Sem novos clientes
                    </p>
                </CardContent>
            </Card>
        </div>
        <div class="grid gap-4 md:gap-4 lg:grid-cols-2 xl:grid-cols-3">
            <Card class="col-span-1">
                <CardHeader>
                    <CardTitle>Resumo de vendas</CardTitle>
                    <CardDescription>Resumo de vendas por mês</CardDescription>
                </CardHeader>
                <CardContent class="h-[calc(100%-6rem)]">
                    <BarChart v-if="vendas.length > 0" class="h-48 py-4" :rounded-corners="4"
                        :data="calcularTotalPorMes()" index="index" :categories="['total']"
                        :y-formatter="formateTicketValue" :custom-tooltip="CustomTooltipChart" />
                    <div v-else class="flex flex-col items-center justify-center h-full w-full">
                        <ChartColumnBig class="w-16 h-16 text-muted-foreground" />
                        <p class="text-center text-sm text-muted-foreground">Nenhuma venda encontrada</p>
                    </div>
                </CardContent>
            </Card>
            <Card class="col-span-1">
                <CardHeader>
                    <CardTitle>Resumo de lançamentos</CardTitle>
                    <CardDescription>Resumo de lançamentos por mês</CardDescription>
                </CardHeader>
                <CardContent class="h-[calc(100%-6rem)]">
                    <BarChart v-if="resumoFinanceiro.resumo.total > 0" class="h-48 py-4" :rounded-corners="4"
                        :data="resumoFinanceiro.graficos.resumoPorMes" index="name" :custom-tooltip="CustomTooltipChart"
                        :categories="['receita', 'despesa']" :colors="['#22c55e', '#ef4444']"
                        :y-formatter="formateTicketValue" />
                    <div v-else class="flex flex-col items-center justify-center h-full w-full">
                        <ChartColumnBig class="w-16 h-16 text-muted-foreground" />
                        <p class="text-center text-sm text-muted-foreground">Nenhum lançamento encontrado</p>
                    </div>
                </CardContent>
            </Card>
            <Card class="col-span-1">
                <CardHeader>
                    <CardTitle>Resumo de assinaturas</CardTitle>
                    <CardDescription>Resumo de assinaturas por mês</CardDescription>
                </CardHeader>
                <CardContent class="h-[calc(100%-6rem)]">
                    <div class="flex flex-col items-center justify-center h-full w-full">
                        <ChartColumnBig class="w-16 h-16 text-muted-foreground" />
                        <p class="text-center text-sm text-muted-foreground">Nenhuma assinatura encontrada</p>
                    </div>
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
                <CardContent class="h-[calc(100%-6rem)]">
                    <UltimosLancamentos v-if="resumoFinanceiro.ultimoslancamentos.length"
                        :lancamentos="resumoFinanceiro.ultimoslancamentos" />
                    <div v-else class="flex flex-col items-center justify-center h-full w-full">
                        <Table2 class="w-16 h-16 text-muted-foreground" />
                        <p class="text-center text-sm text-muted-foreground">Nenhum lançamento encontrado</p>
                    </div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader class="flex flex-row items-center">
                    <div class="grid gap-2">
                        <CardTitle>Vendas recentes</CardTitle>
                        <CardDescription>
                            Veja duas vendas recentes
                        </CardDescription>
                    </div>
                    <Button v-show="loginStore.dataUserInfosLogged?.vendas" as-child size="sm" class="ml-auto gap-1">
                        <RouterLink to="/app/vendas/relatorio">
                            Ver tudo
                            <ArrowUpRight class="h-4 w-4" />
                        </RouterLink>
                    </Button>
                </CardHeader>
                <CardContent class="h-[calc(100%-6rem)]">
                    <UltimasVendas v-if="vendasRecents.length" :vendas="vendasRecents" />
                    <div v-else class="flex flex-col items-center justify-center h-full w-full">
                        <Table2 class="w-16 h-16 text-muted-foreground" />
                        <p class="text-center text-sm text-muted-foreground">Nenhuma venda encontrada</p>
                    </div>
                </CardContent>
            </Card>
        </div>
    </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";
import { ArrowBigDown, ArrowBigUp, ArrowUpRight, ChartColumnBig, CreditCard, DollarSign, EyeOff, PenTool, Table2, UsersRound } from "lucide-vue-next"
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { BarChart } from '@/components/ui/chart-bar'
import VendasRepository from "@/repositories/vendas/vendasRepository";
import { IVenda } from "@/types/vendas/IVenda";
import CustomTooltipChart from "@/components/customs/CustomTooltipChart.vue";
import { RouterLink } from "vue-router";
import { IResumoFinanceiro } from "@/types/financeiro/IResumoFinanceiro";
import LancamentosRepository from "@/repositories/financeiro/lancamentosRepository";
import { computed } from "vue";
import { formatRealValue } from "@/utils/formatterUtil";
import UltimosLancamentos from "@/pages/Financeiro/Lancamentos/Dashboard/UltimosLancamentos.vue";
import UltimasVendas from "@/pages/Vendas/Dashboard/UltimasVendas.vue";
import { useLoginStore } from "@/stores/login/loginStore";
const loginStore = useLoginStore();

const vendas = ref<IVenda[]>([])
const vendasRecents = ref<IVenda[]>([])
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

const getResumo = async () => {
    const [fetchvendas, fetchFinanceiro] = await Promise.all([
        VendasRepository.getAll(1000, 1, ''),
        LancamentosRepository.getResume()
    ])
    vendas.value = fetchvendas.data
    vendasRecents.value = vendas.value.slice().sort((a: any, b: any) => b.id - a.id).slice(0, 10)
    resumoFinanceiro.value = fetchFinanceiro
}

const formateTicketValue = (value: any) => {
    return typeof value === 'number'
        ? `R$ ${new Intl.NumberFormat('us').format(value).toString()}`
        : ''
}
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

onMounted(async () => {
    await getResumo()
})
</script>