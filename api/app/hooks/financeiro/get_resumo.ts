import { FinanceiroParcelamento, FinanceiroTransacao } from "@prisma/client";

type ResumoTransacoes = FinanceiroTransacao & {
  FinanceiroParcelamento?: FinanceiroParcelamento[];
};

export const getResumoTransacoes = (data: ResumoTransacoes[]) => {
  const total = data.reduce((acc, { valorFinal }) => acc + (valorFinal ?? 0), 0);

  const calculateSum = (condition: (item: ResumoTransacoes) => boolean) =>
    data.reduce((acc, item) => acc + (condition(item) ? item.valorFinal ?? 0 : 0), 0);

  const pendenteReceitaAVista = calculateSum(
    ({ status, parcelado, natureza }) =>
      status === "pendente" && parcelado === "nao" && natureza === "receita"
  );

  const efetivadoReceitaAVista = calculateSum(
    ({ status, parcelado, natureza }) =>
      status === "recebido" && parcelado === "nao" && natureza === "receita"
  );

  const pendenteDespesaAVista = calculateSum(
    ({ status, parcelado, natureza }) =>
      status === "pendente" && parcelado === "nao" && natureza === "despesa"
  );

  const efetivadoDespesaAVista = calculateSum(
    ({ status, parcelado, natureza }) =>
      status === "recebido" && parcelado === "nao" && natureza === "despesa"
  );

  const filterByNatureza = (natureza: string) =>
    data.filter(({ parcelado, natureza: itemNatureza }) => parcelado === "sim" && itemNatureza === natureza);

  const sumParcelamentos = (
    items: ResumoTransacoes[],
    statusCondition: string
  ) =>
    items.reduce(
      (acc, { FinanceiroParcelamento }) =>
        acc +
        (FinanceiroParcelamento?.reduce(
          (sum, { status, valor }) => sum + (status === statusCondition ? valor ?? 0 : 0),
          0
        ) ?? 0),
      0
    );

  const receitasParceladas = filterByNatureza("receita");
  const despesasParceladas = filterByNatureza("despesa");

  const pendentesReceitasAPrazo = sumParcelamentos(receitasParceladas, "pendente");
  const efetivadoReceitasAPrazo = sumParcelamentos(receitasParceladas, "recebido");
  const pendentesDespesasAPrazo = sumParcelamentos(despesasParceladas, "pendente");
  const efetivadoDespesasAPrazo = sumParcelamentos(despesasParceladas, "recebido");

  return {
    total,
    pendenteReceitaAVista,
    efetivadoReceitaAVista,
    pendenteDespesaAVista,
    efetivadoDespesaAVista,
    pendentesReceitasAPrazo,
    pendentesDespesasAPrazo,
    efetivadoReceitasAPrazo,
    efetivadoDespesasAPrazo,
  };
};
