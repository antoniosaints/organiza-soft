import { defineStore } from "pinia";

export interface IChaveValor {
  chave: string;
  valor: string;
}
export const useInfosProdutoStore = defineStore("infosProdutosStore", () => {
  const unidadesMedida: IChaveValor[] = [
    { chave: "UN", valor: "Unidade" },
    { chave: "KG", valor: "Quilograma" },
    { chave: "G", valor: "Grama" },
    { chave: "MG", valor: "Miligrama" },
    { chave: "TON", valor: "Tonelada" },
    { chave: "L", valor: "Litro" },
    { chave: "ML", valor: "Mililitro" },
    { chave: "M", valor: "Metro" },
    { chave: "CM", valor: "Centímetro" },
    { chave: "MM", valor: "Milímetro" },
    { chave: "M2", valor: "Metro quadrado" },
    { chave: "CM2", valor: "Centímetro quadrado" },
    { chave: "M3", valor: "Metro cúbico" },
    { chave: "CM3", valor: "Centímetro cúbico" },
    { chave: "PC", valor: "Peça" },
    { chave: "DZ", valor: "Dúzia" },
    { chave: "CJ", valor: "Conjunto" },
    { chave: "PCT", valor: "Pacote" },
    { chave: "FD", valor: "Fardo" },
    { chave: "SC", valor: "Saco" },
    { chave: "ROL", valor: "Rolo" },
    { chave: "CX", valor: "Caixa" },
    { chave: "GL", valor: "Galão" },
    { chave: "HR", valor: "Hora" },
    { chave: "MIN", valor: "Minuto" },
    { chave: "PR", valor: "Par" },
    { chave: "KT", valor: "Kit" },
  ];

  const origemProduto: IChaveValor[] = [
    { chave: "0", valor: "Nacional" },
    { chave: "1", valor: "Estrangeiro: Importação Direta" },
    { chave: "2", valor: "Estrangeiro: Adquirido no Mercado Interno" },
    { chave: "3", valor: "Nacional: Conteúdo Importado Superior a 40%" },
    {
      chave: "4",
      valor:
        "Nacional: Produção Conforme os Processos Produtivos Básicos (PPB)",
    },
    { chave: "5", valor: "Nacional: Conteúdo Importado Inferior a 40%" },
    {
      chave: "6",
      valor: "Nacional: Produção pela Zona Franca de Manaus (ZFM)",
    },
    { chave: "7", valor: "Nacional: Serviço de Importação Direta" },
    { chave: "8", valor: "Nacional: Importação Adquirida no Mercado Interno" },
  ];

  return {
    unidadesMedida,
    origemProduto,
  };
});
