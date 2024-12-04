import ITransacao from "@/types/financeiro/ILancamentos";
import { defineStore } from "pinia";
import { Ref, ref } from "vue";

export interface ISchemaLancamento {
  lancamento: ITransacao;
  periodo: "semana" | "mes" | "ano";
  isParcelado: boolean;
  quantidadeParcelas?: number;
  isEfetivado: boolean;
  hasEntrada: boolean;
  valorEntrada?: number;
  dataPrimeiraParcela?: any;
  dataEntrada?: any;
  dataPagamento?: any;
  valorLancamento?: number;
}

export const useLancamentoSchemaStore = defineStore(
  "lancamentoSchemaStore",
  () => {
    const defaultData: ISchemaLancamento = {
      lancamento: {
        operacao: "entrada",
        status: "pendente",
        taxaDesconto: 0,
        taxaCambio: 0,
        taxaJuros: 0,
        contaId: null,
        natureza: "receita",
        categoriaId: null,
        dataVencimento: new Date(),
        dataLancamento: new Date(),
        valor: 0,
        metodoPagamento: "dinheiro",
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
      valorLancamento: 0.01,
    };
    const schema = ref({ ...defaultData }) as Ref<ISchemaLancamento>;

    const resetData = () => {
      schema.value = { ...defaultData };
    };

    return { schema, resetData };
  }
);
