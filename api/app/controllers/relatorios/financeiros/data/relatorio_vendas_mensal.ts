import { TableCell } from "pdfmake/interfaces";
import { prismaService } from "../../../../services";
import { Request } from "express";

export const relatorioVendasMensal = async (
  request: Request
): Promise<TableCell[][]> => {
  const lancamentos = await prismaService.financeiroTransacao.findMany({
    where: {
      contaSistemaId: request.body.contaSistemaId,
    },
    include: {
      Categoria: true,
    },
  });

  const categorias: { [key: string]: { receita: number; despesa: number } } =
    {};

  lancamentos.forEach((transacao) => {
    const { Categoria, valor, natureza } = transacao;
    const categoria = Categoria?.categoria;
    if (!categorias[categoria]) {
      categorias[categoria] = { receita: 0, despesa: 0 };
    }
    if (natureza === "receita") {
      categorias[categoria].receita += valor;
    } else {
      categorias[categoria].despesa += valor;
    }
  });

  const totalReceita = Object.values(categorias).reduce(
    (acc, curr) => acc + curr.receita,
    0
  );
  const totalDespesa = Object.values(categorias).reduce(
    (acc, curr) => acc + curr.despesa,
    0
  );
  const totalGeral = totalReceita + totalDespesa;

  return Object.entries(categorias).map(([categoria, { receita, despesa }]) => {
    const porcentagemReceita = (receita / totalGeral) * 100;
    const porcentagemDespesa = (despesa / totalGeral) * 100;
    const porcentagem = Math.min(porcentagemReceita + porcentagemDespesa, 100);
    return [
      categoria,
      `R$ ${receita.toFixed(2)}`,
      `R$ ${despesa.toFixed(2)}`,
      `${porcentagem.toFixed(2)}%`,
    ];
  });
};
