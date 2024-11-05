<script setup lang="ts">
import { ref } from 'vue';
import { Package } from 'lucide-vue-next';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BarChart } from '@/components/ui/chart-bar';

const changeHistory = [
    { date: '2023-06-15', user: 'Ana Silva', action: 'Atualização de preço' },
    { date: '2023-06-10', user: 'Carlos Oliveira', action: 'Atualização de estoque' },
    { date: '2023-06-05', user: 'Mariana Santos', action: 'Edição de descrição' },
];

const formateTicketValue = (value: any) => {
  return typeof value === 'number'
    ? `${value}`
    : ''
}

const data = [
  { name: 'Jan', entradas: Math.floor(Math.random() * 2000) + 500, saidas: Math.floor(Math.random() * 2000) + 500 },
  { name: 'Fev', entradas: Math.floor(Math.random() * 2000) + 500, saidas: Math.floor(Math.random() * 2000) + 500 },
  { name: 'Mar', entradas: Math.floor(Math.random() * 2000) + 500, saidas: Math.floor(Math.random() * 2000) + 500 },
  { name: 'Abr', entradas: Math.floor(Math.random() * 2000) + 500, saidas: Math.floor(Math.random() * 2000) + 500 },
  { name: 'Mar', entradas: Math.floor(Math.random() * 2000) + 500, saidas: Math.floor(Math.random() * 2000) + 500 },
  { name: 'Jun', entradas: Math.floor(Math.random() * 2000) + 500, saidas: Math.floor(Math.random() * 2000) + 500 },
  { name: 'Jul', entradas: Math.floor(Math.random() * 2000) + 500, saidas: Math.floor(Math.random() * 2000) + 500 },
]

const isActive = ref(true);
</script>

<template>
    <div class="max-w-6xl mx-auto py-2">
        <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
                <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle class="text-sm font-medium">Total de Vendas</CardTitle>
                    <Package class="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div class="text-2xl font-bold">1,234</div>
                    <p class="text-xs text-muted-foreground">+20.1% em relação ao mês anterior</p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle class="text-sm font-medium">Avaliação Média</CardTitle>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                        stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        class="h-4 w-4 text-muted-foreground">
                        <path
                            d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                    </svg>
                </CardHeader>
                <CardContent>
                    <div class="text-2xl font-bold">4.5</div>
                    <p class="text-xs text-muted-foreground">Baseado em 128 avaliações</p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle class="text-sm font-medium">Estoque Atual</CardTitle>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                        stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        class="h-4 w-4 text-muted-foreground">
                        <path d="M20 12V22H4V12" />
                        <path d="M22 7H2V12H22V7Z" />
                        <path d="M12 22V7" />
                        <path
                            d="M12 7H16.5C17.3284 7 18 6.32843 18 5.5C18 4.67157 17.3284 4 16.5 4C15.6716 4 15 4.67157 15 5.5" />
                        <path
                            d="M12 7H7.5C6.67157 7 6 6.32843 6 5.5C6 4.67157 6.67157 4 7.5 4C8.32843 4 9 4.67157 9 5.5" />
                    </svg>
                </CardHeader>
                <CardContent>
                    <div class="text-2xl font-bold">89</div>
                    <p class="text-xs text-muted-foreground">3 abaixo do limite mínimo</p>
                </CardContent>
            </Card>
        </div>

        <div class="mt-4 grid gap-4 md:grid-cols-2">
            <Card>
                <CardHeader>
                    <CardTitle>Informações do Produto</CardTitle>
                </CardHeader>
                <CardContent>
                    <div class="space-y-2">
                        <div class="flex justify-between">
                            <span class="font-medium">Categoria:</span>
                            <span>Vestuário</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="font-medium">Preço:</span>
                            <span>R$ 89,90</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="font-medium">Status:</span>
                            <Badge :variant="isActive ? 'default' : 'secondary'">{{ isActive ? 'Ativo' : 'Inativo' }}
                            </Badge>
                        </div>
                        <div class="flex justify-between">
                            <span class="font-medium">Última Atualização:</span>
                            <span>15/06/2023</span>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Movimentação</CardTitle>
                </CardHeader>
                <CardContent>
                    <BarChart class="h-48 py-4" :rounded-corners="4" :type="'stacked'" :data="data" index="name" :categories="['entradas', 'saidas']"
                        :y-formatter="formateTicketValue" />
                </CardContent>
            </Card>
        </div>

        <Card class="mt-4">
            <CardHeader>
                <CardTitle>Histórico de Alterações</CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Data</TableHead>
                            <TableHead>Usuário</TableHead>
                            <TableHead>Ação</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow v-for="(change, index) in changeHistory" :key="index">
                            <TableCell>{{ change.date }}</TableCell>
                            <TableCell>{{ change.user }}</TableCell>
                            <TableCell>{{ change.action }}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    </div>
</template>
