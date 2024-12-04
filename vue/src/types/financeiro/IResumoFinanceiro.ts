import ITransacao from "./ILancamentos";

export interface IGrafico {
    name: string;
    total: number;
    pendente: number;
    pago: number;
}
interface IReceitaDespesa {
    name: string;
    receita: number;
    despesa: number;
}
export interface IBalanco {
    name: string;
    saldo: number;
    receita: number;
    despesa: number;
  }
export interface IResumoFinanceiro {
    resumo: {
        total: number
        pendenteReceitaAVista: number
        efetivadoReceitaAVista: number
        pendenteDespesaAVista: number
        efetivadoDespesaAVista: number
        pendentesReceitasAPrazo: number
        pendentesDespesasAPrazo: number,
        efetivadoReceitasAPrazo: number,
        efetivadoDespesasAPrazo: number,
    }
    resumoContas: IBalanco[]
    ultimoslancamentos: ITransacao[]
    graficos: {
        resumoPorCategoria: IGrafico[],
        resumoPorFormaPagamento: IGrafico[]
        resumoPorMes: IReceitaDespesa[]
    }
}