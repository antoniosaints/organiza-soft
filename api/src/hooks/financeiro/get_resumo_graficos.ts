import {
  FinanceiroCategorias,
  FinanceiroParcelamento,
  FinanceiroTransacao,
} from "@prisma/client";
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
type ResumoTransacoes = FinanceiroTransacao & {
  FinanceiroParcelamento?: FinanceiroParcelamento[];
  Categoria?: FinanceiroCategorias;
};
const resumoByCategoria = (data: ResumoTransacoes[]): IGrafico[] => {
  const totalPorCategoria = data.reduce<IGrafico[]>((acc, item) => {
    const categoria = item.Categoria;
    const index = acc.findIndex((entry) => entry.name === categoria?.categoria);

    if (index !== -1) {
      if (
        item.parcelado === "nao" &&
        item.status === "pendente" &&
        !item.FinanceiroParcelamento?.length
      ) {
        acc[index].pendente += item.valorFinal;
      } else {
        acc[index].pendente +=
          item.FinanceiroParcelamento?.reduce(
            (subAcc: number, val: { status?: string; valor?: number }) =>
              subAcc + (val.status === "pendente" ? val.valor || 0 : 0),
            0
          ) || 0;
      }

      if (
        item.parcelado === "nao" &&
        item.status === "recebido" &&
        !item.FinanceiroParcelamento?.length
      ) {
        acc[index].pago += item.valorFinal;
      } else {
        acc[index].pago +=
          item.FinanceiroParcelamento?.reduce(
            (subAcc: number, val: { status?: string; valor?: number }) =>
              subAcc + (val.status === "recebido" ? val.valor || 0 : 0),
            0
          ) || 0;
      }

      acc[index].total = acc[index].pendente + acc[index].pago;
    } else {
      acc.push({
        name: categoria?.categoria || "Indefinido",
        total: item.valorFinal,
        pendente: item.status === "pendente" ? item.valorFinal : 0,
        pago: item.status === "recebido" ? item.valorFinal : 0,
      });
    }

    return acc;
  }, []);

  return totalPorCategoria;
};

const resumoByFormaPagamento = (data: ResumoTransacoes[]): IGrafico[] => {
  const totalPorFormaPagamento = data.reduce<IGrafico[]>((acc, item) => {
    const formaPagamento = item.metodoPagamento || "Indefinido";
    const index = acc.findIndex((entry) => entry.name === formaPagamento);

    if (index !== -1) {
      if (
        item.parcelado === "nao" &&
        item.status === "pendente" &&
        !item.FinanceiroParcelamento?.length
      ) {
        acc[index].pendente += item.valorFinal;
      } else {
        acc[index].pendente +=
          item.FinanceiroParcelamento?.reduce(
            (subAcc: number, val: { status?: string; valor?: number }) =>
              subAcc + (val.status === "pendente" ? val.valor || 0 : 0),
            0
          ) || 0;
      }

      if (
        item.parcelado === "nao" &&
        item.status === "recebido" &&
        !item.FinanceiroParcelamento?.length
      ) {
        acc[index].pago += item.valorFinal;
      } else {
        acc[index].pago +=
          item.FinanceiroParcelamento?.reduce(
            (subAcc: number, val: { status?: string; valor?: number }) =>
              subAcc + (val.status === "recebido" ? val.valor || 0 : 0),
            0
          ) || 0;
      }

      acc[index].total = acc[index].pendente + acc[index].pago;
    } else {
      acc.push({
        name: formaPagamento,
        total: item.valorFinal,
        pendente:
          item.status === "pendente" && item.parcelado === "nao"
            ? item.valorFinal
            : 0,
        pago:
          item.status === "recebido" && item.parcelado === "nao"
            ? item.valorFinal
            : 0,
      });
    }

    return acc;
  }, []);

  return totalPorFormaPagamento;
};

export const resumoByMes = (data: ResumoTransacoes[]): IReceitaDespesa[] => {
  const totalPorMes = data.reduce<IReceitaDespesa[]>((acc, item) => {
    // Extrair o mês a partir de `dataLancamento`
    const date = new Date(item.dataVencimento);
    const monthYear = date.toLocaleDateString("pt-BR", { month: "2-digit", year: "numeric" });
    const index = acc.findIndex((entry) => entry.name === monthYear);

    if (index !== -1) {
      if (item.parcelado === "nao" && item.natureza === "receita") {
        acc[index].receita += item.valorFinal;
      } else {
        acc[index].receita +=
          item.FinanceiroParcelamento?.reduce(
            (subAcc: number, val: { valor?: number }) =>
              subAcc + (item.natureza === "receita" ? val?.valor || 0 : 0),
            0
          ) || 0;
      }
      if (item.parcelado === "nao" && item.natureza === "despesa") {
        acc[index].despesa += item.valorFinal;
      } else {
        acc[index].despesa +=
          item.FinanceiroParcelamento?.reduce(
            (subAcc: number, val: { valor?: number }) =>
              subAcc + (item.natureza === "despesa" ? val?.valor || 0 : 0),
            0
          ) || 0;
      }
    } else {
      acc.push({
        name: monthYear,
        receita:
          item.natureza === "receita" && item.parcelado === "nao"
            ? item.valorFinal
            : item.FinanceiroParcelamento?.reduce(
                (subAcc: number, val: { valor?: number }) =>
                  subAcc + (item.natureza === "receita" ? val?.valor || 0 : 0),
                0
              ) || 0,
        despesa:
          item.natureza === "despesa" && item.parcelado === "nao"
            ? item.valorFinal
            : item.FinanceiroParcelamento?.reduce(
                (subAcc: number, val: { valor?: number }) =>
                  subAcc + (item.natureza === "despesa" ? val?.valor || 0 : 0),
                0
              ) || 0,
      });
    }

    return acc;
  }, []);

  return totalPorMes;
};

export const resumoGraficos = (data: ResumoTransacoes[]) => {
  return {
    resumoPorCategoria: resumoByCategoria(data),
    resumoPorFormaPagamento: resumoByFormaPagamento(data),
    resumoPorMes: resumoByMes(data),
  };
};
