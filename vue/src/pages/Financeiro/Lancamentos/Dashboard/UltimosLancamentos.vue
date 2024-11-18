<script setup lang="ts">
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import ITransacao from '@/types/financeiro/ILancamentos';
import IParcelamento from '@/types/financeiro/IParcelamento';
import { formatRealValue } from '@/utils/formatterUtil';
import { LancamentosBadge } from '../Tabela';
import CellVencimentos from '../Tabela/CellVencimentos.vue';
import BadgeMetodo from '../Tabela/BadgeMetodo.vue';
import BadgeNatureza from '../Tabela/BadgeNatureza.vue';

defineProps<{
    lancamentos: ITransacao[]
}>()

const getValorLancamento = (lancamento: ITransacao) => {
    let valorTotal = 0;
    if (lancamento.parcelado == "sim") {
        valorTotal = lancamento.FinanceiroParcelamento?.reduce((acc: number, item: IParcelamento) => acc + item.valor, 0) || 0;
    }
    valorTotal = lancamento.valorFinal!   
    return formatRealValue(valorTotal);
}
</script>

<template>
    <div>
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Cliente / Fornecedor</TableHead>
                    <TableHead class="hidden xl:table-cell">
                        Tipo
                    </TableHead>
                    <TableHead class="hidden xl:table-cell">
                        Status
                    </TableHead>
                    <TableHead class="hidden xl:table-cell">
                        Pagamento
                    </TableHead>
                    <TableHead class="hidden xl:table-cell">
                        Vencimento
                    </TableHead>
                    <TableHead class="text-right">
                        Valor
                    </TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow v-for="lancamento in lancamentos" :key="lancamento.id" >
                    <TableCell>
                        <div class="font-medium">
                            {{
                                ((lancamento.ClienteOnLancamentos?.length) ? lancamento.ClienteOnLancamentos[0].Cliente.nome : "Sem cliente")
                            }}
                        </div>
                        <div class="hidden text-sm text-muted-foreground md:inline">
                            {{
                                ((lancamento.ClienteOnLancamentos?.length) ? lancamento.ClienteOnLancamentos[0].Cliente.email : "Nenhum email")
                            }}
                        </div>
                    </TableCell>
                    <TableCell class="hidden xl:table-cell">
                        <BadgeNatureza :natureza="lancamento.natureza" />
                    </TableCell>
                    <TableCell class="hidden xl:table-cell">
                        <LancamentosBadge :data="lancamento" />
                    </TableCell>
                    <TableCell class="hidden xl:table-cell">
                        <BadgeMetodo :data="lancamento" />
                    </TableCell>
                    <TableCell class="hidden md:table-cell lg:hidden xl:table-cell">
                        <CellVencimentos :data="lancamento" />
                    </TableCell>
                    <TableCell class="text-right font-bold">
                        {{ getValorLancamento(lancamento) }}
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
    </div>
</template>