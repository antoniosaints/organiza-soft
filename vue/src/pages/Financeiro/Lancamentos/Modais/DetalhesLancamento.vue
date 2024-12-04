<script setup lang="ts">
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Printer, Download, Receipt, CalendarCheck2 } from 'lucide-vue-next'
import { useLancamentosDetalhesStore } from '@/stores/financeiro/lancamentos/lancamentosDetalhesStore'
import { LancamentosBadge } from '../Tabela'
import { formatDate, formatDateToPtbr, formatRealValue } from '@/utils/formatterUtil'
import ITransacao from '@/types/financeiro/ILancamentos'
import IParcelamento from '@/types/financeiro/IParcelamento'
import AcoesParcelamento from "./AcoesParcelamento.vue"
import { ScrollArea } from "@/components/ui/scroll-area"
import BadgeStatus from "../Tabela/BadgeStatus.vue"
const store = useLancamentosDetalhesStore()

const getValorLancamento = (lancamento: ITransacao) => {
  let valorTotal = 0;
  if (lancamento.parcelado == "sim" && lancamento.FinanceiroParcelamento) {
    const parcelas = lancamento.FinanceiroParcelamento?.filter((item) => (item.status != "cancelada"));
    const totalParcelas = parcelas.length || 0;
    const totalPagas = parcelas.filter((item) => (item.status === "recebido")).length || 0;
    if (totalParcelas > 0 && totalPagas === totalParcelas) { lancamento.status = "recebido" } else { lancamento.status = "pendente" }
    valorTotal = parcelas.reduce((acc: number, item: IParcelamento) => acc + item.valor, 0) || 0;
  } else {
    valorTotal = lancamento.valorFinal!
  }
  return formatRealValue(valorTotal);
}

</script>

<template>
  <Dialog v-model:open="store.isOpenModalLancamento" @openChange="store.isOpenModalLancamento = $event">
    <DialogContent class="max-w-4xl max-h-[90vh] overflow-y-auto">
      <DialogHeader class="border-b pb-4">
        <div class="flex justify-between items-center">
          <div class="flex items-center space-x-4">
            <Receipt class="w-10 h-10 text-primary" />
            <div>
              <DialogTitle class="text-2xl font-bold">Lançamento #{{ store.lancamento?.id }}</DialogTitle>
              <p class="text-sm text-muted-foreground">{{ store.lancamento?.descricao }}</p>
            </div>
          </div>
          <div class="px-3 py-1 rounded-full text-sm font-semibold">
            <LancamentosBadge :data="store.lancamento!" />
          </div>
        </div>
      </DialogHeader>

      <div class="grid gap-4 py-4 font-mono">
        <div class="grid md:grid-cols-2 gap-4">
          <div class="flex flex-col gap-2">
            <div>
              <h3 class="text-md font-semibold mb-1">Detalhes do cliente</h3>
              <p class="text-sm">{{ store.lancamento?.ClienteOnLancamentos?.length ?
                store.lancamento.ClienteOnLancamentos[0].Cliente.nome
                : "Sem cliente vinculado" }}</p>
              <p class="text-sm text-muted-foreground">{{ store.lancamento?.ClienteOnLancamentos?.length ?
                store.lancamento.ClienteOnLancamentos[0].Cliente.email : "Sem email vinculado" }}</p>
            </div>
            <div>
              <h3 class="text-md font-semibold mb-1">Informações fiscais</h3>
              <p class="text-sm text-muted-foreground">Código NFe: {{ store.lancamento?.codigoNfe || "Não informado" }}
              </p>
              <p class="text-sm text-muted-foreground">Código Serviço: {{ store.lancamento?.codigo_servico || "Não informado" }}</p>
              <p class="text-sm text-muted-foreground">Moeda: {{ store.lancamento?.moeda || "Não informado" }}</p>
            </div>
          </div>
          <div>
            <h3 class="text-md font-semibold mb-2">Detalhes do lançamento</h3>
            <div class="grid grid-cols-2 gap-2 text-sm">
              <p class="font-medium">Categoria:</p>
              <p>{{ store.lancamento?.Categoria?.categoria || "Sem categoria" }}</p>
              <p class="font-medium">Conta:</p>
              <p>{{ store.lancamento?.Conta?.conta || "Sem conta" }}</p>
              <p class="font-medium">Data do lançamento:</p>
              <p>{{ formatDateToPtbr(store.lancamento?.dataLancamento as string) }}</p>
              <p class="font-medium">Data de vencimento:</p>
              <p>{{ formatDateToPtbr(store.lancamento?.dataVencimento as string) }}</p>
              <p class="font-medium">Valor do lançamento:</p>
              <p class="text-lg font-bold">{{ getValorLancamento(store.lancamento!) }}</p>
            </div>
          </div>
        </div>

        <div v-show="store.lancamento?.FinanceiroParcelamento?.length">
          <h3 class="text-lg font-semibold mb-2">Detalhes do parcelamento</h3>
          <ScrollArea class="h-50">
            <div class="rounded-lg border shadow-sm overflow-auto">
              <Table>
                <TableHeader>
                  <TableRow class="bg-secondary">
                    <TableHead class="w-[100px] cursor-pointer">
                      Tipo
                    </TableHead>
                    <TableHead class="cursor-pointer">
                      #
                    </TableHead>
                    <TableHead class="cursor-pointer">
                      Status
                    </TableHead>
                    <TableHead class="cursor-pointer">
                      Vencimento
                    </TableHead>
                    <TableHead class="cursor-pointer">
                      Valor
                    </TableHead>
                    <TableHead class="cursor-pointer">
                      Valor recebido
                    </TableHead>
                    <TableHead class="text-right cursor-pointer">
                      Ações
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow v-for="parcela in store.lancamento?.FinanceiroParcelamento" :key="parcela.id">
                    <TableCell class="font-medium">{{ parcela.tipo.substring(0, 1).toUpperCase() +
                      parcela.tipo.substring(1) }}</TableCell>
                    <TableCell># {{ parcela.parcela }}</TableCell>
                    <TableCell>
                      <BadgeStatus :data="parcela" :natureza="store.lancamento!.natureza" />
                    </TableCell>
                    <TableCell>
                      <div class="flex items-center">
                        <CalendarCheck2 class="w-3 h-3 mr-1 text-green-500" />
                        {{ formatDate(parcela.dataVencimento! as string) }}
                      </div>
                    </TableCell>
                    <TableCell>
                      <span class="font-bold">
                        {{ formatRealValue(parcela.valor) }}
                      </span>
                    </TableCell>
                    <TableCell class="font-bold">
                      {{ formatRealValue(parcela.status === "pendente" ? 0 : parcela.valor) }}
                    </TableCell>
                    <TableCell class="text-right">
                      <AcoesParcelamento :parcela="parcela" />
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </ScrollArea>
        </div>
      </div>
      <div class="flex justify-between items-center mt-6 pt-6 border-t">
        <div class="flex space-x-2">
          <Button variant="outline" size="sm" @click="console.log('Print invoice')">
            <Printer class="w-4 h-4 mr-2" /> Imprimir
          </Button>
          <Button variant="outline" size="sm" @click="console.log('Download invoice')">
            <Download class="w-4 h-4 mr-2" /> Download PDF
          </Button>
        </div>
        <Button @click="store.isOpenModalLancamento = false">Fechar</Button>
      </div>
    </DialogContent>
  </Dialog>
</template>
