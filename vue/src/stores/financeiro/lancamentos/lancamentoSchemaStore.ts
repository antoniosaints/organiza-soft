import ITransacao from "@/types/financeiro/ILancamentos";
import { defineStore } from "pinia";
import { Ref, ref } from "vue";

export interface ISchemaLancamento {
    lancamento: ITransacao
    periodo: "semana" | "mes" | "ano"
    isParcelado: boolean
    quantidadeParcelas?: number
    isEfetivado: boolean
    hasEntrada: boolean
    valorEntrada?: number
    dataPrimeiraParcela?: any
    dataEntrada?: any
    dataPagamento?: any
    valorLancamento?: number
}

export const useLancamentoSchemaStore = defineStore("lancamentoSchemaStore", () => {
    const schema = ref({
        lancamento: {
            operacao: "entrada",
            status: "pendente",
            contaId: 1,
            natureza: "receita",
            usuarioLancamento: 1,
            categoriaId: 1,
            dataVencimento: new Date(),
            dataLancamento: new Date(),
            valor: 0,
            metodoPagamento: "dinheiro"
        },
        periodo: "mes",
        dataPrimeiraParcela: new Date(),
        valorEntrada: 0,
        isParcelado: false,
        dataPagamento: new Date(),
        quantidadeParcelas: 1,
        dataEntrada: new Date(),
        isEfetivado: false,
        hasEntrada: false,
        valorLancamento: 0
    }) as Ref<ISchemaLancamento>

    return { schema }
});