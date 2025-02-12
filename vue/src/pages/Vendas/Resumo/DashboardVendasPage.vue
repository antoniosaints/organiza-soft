
<template>
  <div class="p-6">
    <header class="mb-8">
      <h1 class="text-3xl font-bold">Dashboard de Vendas</h1>
    </header>

    <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      <!-- Card de Vendas Totais -->
      <Card class="p-4">
        <CardHeader>
          <CardTitle>Vendas Totais</CardTitle>
        </CardHeader>
        <CardContent>
          <div class="text-2xl font-bold">R$ 45.231,00</div>
          <p class="text-sm text-muted-foreground">+20.1% em relação ao mês anterior</p>
        </CardContent>
      </Card>

      <!-- Card de Novos Clientes -->
      <Card class="p-4">
        <CardHeader>
          <CardTitle>Novos Clientes</CardTitle>
        </CardHeader>
        <CardContent>
          <div class="text-2xl font-bold">124</div>
          <p class="text-sm text-muted-foreground">+12 desde a última semana</p>
        </CardContent>
      </Card>

      <!-- Card de Taxa de Conversão -->
      <Card class="p-4">
        <CardHeader>
          <CardTitle>Taxa de Conversão</CardTitle>
        </CardHeader>
        <CardContent>
          <div class="text-2xl font-bold">3.2%</div>
          <p class="text-sm text-muted-foreground">+0.4% em relação ao mês anterior</p>
        </CardContent>
      </Card>

      <!-- Card de Ticket Médio -->
      <Card class="p-4">
        <CardHeader>
          <CardTitle>Ticket Médio</CardTitle>
        </CardHeader>
        <CardContent>
          <div class="text-2xl font-bold">R$ 364,50</div>
          <p class="text-sm text-muted-foreground">-2.1% em relação ao mês anterior</p>
        </CardContent>
      </Card>
    </div>

    <div class="grid gap-6 mt-6 md:grid-cols-2">
      <!-- Gráfico de Vendas -->
      <Card class="p-4">
        <CardHeader>
          <CardTitle>Vendas por Período</CardTitle>
        </CardHeader>
        <CardContent>
          <div class="h-[300px]">
            <!-- Adicionar componente de gráfico aqui -->
          </div>
        </CardContent>
      </Card>

      <!-- Tabela de Últimas Vendas -->
      <Card class="p-4">
        <CardHeader>
          <CardTitle>Últimas Vendas</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Cliente</TableHead>
                <TableHead>Valor</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Data</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>João Silva</TableCell>
                <TableCell>R$ 450,00</TableCell>
                <TableCell>
                  <Badge variant="success">Concluída</Badge>
                </TableCell>
                <TableCell>23/03/2024</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Maria Santos</TableCell>
                <TableCell>R$ 890,00</TableCell>
                <TableCell>
                  <Badge variant="warning">Pendente</Badge>
                </TableCell>
                <TableCell>22/03/2024</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  </div>
</template>

<script setup>
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

</script>

<style scoped>

</style>
