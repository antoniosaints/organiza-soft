import { FinanceiroParcelamento, FinanceiroTransacao } from "@prisma/client";
type ResumoTransacoes = FinanceiroTransacao & {
  FinanceiroParcelamento?: FinanceiroParcelamento[]
}
export const getResumoTransacoes = (data: ResumoTransacoes[]) => {
    const total = data.reduce((acc, item) => acc + item.valorFinal!, 0);

    const pendenteReceitaAVista = data.reduce((acc, item) => {
      return acc + ((item.status == "pendente" && item.parcelado == "nao" && item.natureza == "receita") ? item.valorFinal! : 0);
    }, 0);
    const efetivadoReceitaAVista = data.reduce((acc, item) => {
      return acc + ((item.status == "recebido" && item.parcelado == "nao" && item.natureza == "receita") ? item.valorFinal! : 0);
    }, 0);
    const pendenteDespesaAVista = data.reduce((acc, item) => {
      return acc + ((item.status == "pendente" && item.parcelado == "nao" && item.natureza == "despesa") ? item.valorFinal! : 0);
    }, 0);
    const efetivadoDespesaAVista = data.reduce((acc, item) => {
      return acc + ((item.status == "recebido" && item.parcelado == "nao" && item.natureza == "despesa") ? item.valorFinal! : 0);
    }, 0);

    const receitasParceladas = data.filter((item) => item.parcelado == "sim" && item.natureza == "receita");
    const despesasParceladas = data.filter((item) => item.parcelado == "sim" && item.natureza == "despesa");

    const pendentesReceitasAPrazo = receitasParceladas.reduce(
      (acc, item) =>
        acc +
        item.FinanceiroParcelamento!.reduce(
          (acc: number, val: any) => acc + (val?.status == "pendente" ? val?.valor : 0),
          0
        ),
      0
    );
    const efetivadoReceitasAPrazo = receitasParceladas.reduce(
      (acc, item) =>
        acc +
        item.FinanceiroParcelamento!.reduce(
          (acc: number, val: any) => acc + (val?.status == "recebido" ? val?.valor : 0),
          0
        ),
      0
    );
    const pendentesDespesasAPrazo = despesasParceladas.reduce(
      (acc, item) =>
        acc +
        item.FinanceiroParcelamento!.reduce(
          (acc: number, val: any) => acc + (val?.status == "pendente" ? val?.valor : 0),
          0
        ),
      0
    );
    const efetivadoDespesasAPrazo = despesasParceladas.reduce(
      (acc, item) =>
        acc +
        item.FinanceiroParcelamento!.reduce(
          (acc: number, val: any) => acc + (val?.status == "recebido" ? val?.valor : 0),
          0
        ),
      0
    );

    return {
      total,
      pendenteReceitaAVista,
      efetivadoReceitaAVista,
      pendenteDespesaAVista,
      efetivadoDespesaAVista,
      pendentesReceitasAPrazo,
      pendentesDespesasAPrazo,
      efetivadoReceitasAPrazo,
      efetivadoDespesasAPrazo
    };
};