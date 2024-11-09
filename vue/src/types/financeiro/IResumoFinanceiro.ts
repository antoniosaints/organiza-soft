interface IGrafico {
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
    chart: {
        resumoPorCategoria: IGrafico[],
        resumoPorFormaPagamento: IGrafico[],
        resumoPorMes: IReceitaDespesa[]
    }
}