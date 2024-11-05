<template>
    <div class="gap-4 grid">
        <div class="grid gap-4 md:grid-cols-2 md:gap-4 lg:grid-cols-4">
            <Card>
                <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle class="text-sm font-medium">
                        Total recebido
                    </CardTitle>
                    <DollarSign class="h-4 w-4 text-green-500" />
                </CardHeader>
                <CardContent>
                    <div class="text-2xl font-bold text-green-500">
                        R$45,231.89
                    </div>
                    <p class="text-xs text-muted-foreground">
                        +20.1% desde o mês passado
                    </p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle class="text-sm font-medium">
                        Assinaturas
                    </CardTitle>
                    <Users class="h-4 w-4 text-cyan-500" />
                </CardHeader>
                <CardContent>
                    <div class="text-2xl font-bold text-cyan-500">
                        +2350
                    </div>
                    <p class="text-xs text-muted-foreground">
                        +180.1% desde o mês passado
                    </p>
                </CardContent>
            </Card>
            <RouterLink to="/app/vendas/relatorio">
                <Card>
                    <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle class="text-sm font-medium">
                            Vendas
                        </CardTitle>
                        <CreditCard class="h-4 w-4 text-blue-500" />
                    </CardHeader>
                    <CardContent>
                        <div class="text-2xl font-bold text-blue-500">
                            {{ vendas.reduce((total, item) => total + (item.valor - item.valorDesconto!), 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) }}
                        </div>
                        <p class="text-xs text-muted-foreground">
                            +19% desde o mês passado
                        </p>
                    </CardContent>
                </Card>
            </RouterLink>
            <Card>
                <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle class="text-sm font-medium">
                        Clientes
                    </CardTitle>
                    <Activity class="h-4 w-4 text-blue-500" />
                </CardHeader>
                <CardContent>
                    <div class="text-2xl font-bold text-blue-500">
                        +573
                    </div>
                    <p class="text-xs text-muted-foreground">
                        +201 desde o mês passado
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
                <CardContent>
                    <BarChart class="h-48 py-4" :rounded-corners="4" :data="calcularTotalPorMetodoPagamento()" index="index"
                        :categories="['total']" :y-formatter="formateTicketValue" :custom-tooltip="CustomTooltipChart" />
                </CardContent>
            </Card>
            <Card class="col-span-1">
                <CardHeader>
                    <CardTitle>Resumo de assinaturas</CardTitle>
                    <CardDescription>Resumo de assinaturas por mês</CardDescription>
                </CardHeader>
                <CardContent>
                    <BarChart class="h-48 py-4" :rounded-corners="4" :data="data" index="name"
                        :categories="['total', 'meta']" :y-formatter="formateTicketValue" />
                </CardContent>
            </Card>
            <Card class="col-span-1">
                <CardHeader>
                    <CardTitle>Resumo de lançamentos</CardTitle>
                    <CardDescription>Resumo de lançamentos por mês</CardDescription>
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
                            <TableRow>
                                <TableCell>
                                    <div class="font-medium">
                                        Olivia Smith
                                    </div>
                                    <div class="hidden text-sm text-muted-foreground md:inline">
                                        olivia@example.com
                                    </div>
                                </TableCell>
                                <TableCell class="hidden xl:table-cell">
                                    Refund
                                </TableCell>
                                <TableCell class="hidden xl:table-cell">
                                    <Badge class="text-xs" variant="outline">
                                        Declined
                                    </Badge>
                                </TableCell>
                                <TableCell class="hidden md:table-cell lg:hidden xl:table-cell">
                                    2023-06-24
                                </TableCell>
                                <TableCell class="text-right">
                                    $150.00
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    <div class="font-medium">
                                        Noah Williams
                                    </div>
                                    <div class="hidden text-sm text-muted-foreground md:inline">
                                        noah@example.com
                                    </div>
                                </TableCell>
                                <TableCell class="hidden xl:table-cell">
                                    Subscription
                                </TableCell>
                                <TableCell class="hidden xl:table-cell">
                                    <Badge class="text-xs" variant="outline">
                                        Approved
                                    </Badge>
                                </TableCell>
                                <TableCell class="hidden md:table-cell lg:hidden xl:table-cell">
                                    2023-06-25
                                </TableCell>
                                <TableCell class="text-right">
                                    $350.00
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    <div class="font-medium">
                                        Emma Brown
                                    </div>
                                    <div class="hidden text-sm text-muted-foreground md:inline">
                                        emma@example.com
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
                                    2023-06-26
                                </TableCell>
                                <TableCell class="text-right">
                                    $450.00
                                </TableCell>
                            </TableRow>
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
                                    2023-06-27
                                </TableCell>
                                <TableCell class="text-right">
                                    $550.00
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
                            {{ (sale.valor - sale.valorDesconto!).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) }}
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";
import { Activity, ArrowUpRight, CreditCard, DollarSign, Users } from "lucide-vue-next"
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { BarChart } from '@/components/ui/chart-bar'
import VendasRepository from "@/repositories/vendas/vendasRepository";
import { IVenda } from "@/types/vendas/IVenda";
import CustomTooltipChart from "@/components/customs/CustomTooltipChart.vue";
import { RouterLink } from "vue-router";

const vendas = ref<IVenda[]>([])
const vendasRecents = ref<IVenda[]>([])

onMounted(async () => {
    const resultado = await VendasRepository.getAll(1000, 1, '');
    vendas.value = resultado.data
    vendasRecents.value = vendas.value.sort((a: any, b: any) => b.id - a.id).slice(0, 5)
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