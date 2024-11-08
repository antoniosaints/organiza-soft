export const getResumoTransacoes = (data: any[]) => {
    const total = data.reduce((acc, item) => acc + item.valorFinal!, 0);
    const pendenteAvista = data.reduce((acc, item) => {
      return acc + ((item.status == "pendente" && item.parcelado == "nao") ? item.valorFinal! : 0);
    }, 0);
    const efetivadaAVista = data.reduce((acc, item) => {
      return acc + ((item.status == "recebido" && item.parcelado == "nao") ? item.valorFinal! : 0);
    }, 0);
    
    const parcelados = data.filter((item) => item.parcelado == "sim");

    const pendenteParcelado = parcelados.reduce(
      (acc, item) =>
        acc +
        item.FinanceiroParcelamento!.reduce(
          (acc: number, val: any) => acc + (val?.status == "pendente" ? val?.valor : 0),
          0
        ),
      0
    );
    const efetivadoParcelado = parcelados.reduce(
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
      pendenteAvista,
      efetivadaAVista,
      pendenteParcelado,
      efetivadoParcelado,
    };
};