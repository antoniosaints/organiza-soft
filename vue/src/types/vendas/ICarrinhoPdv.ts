export type IProdutoPDV = {
  id: number;
  produto: string;
  preco: number;
  categoria: string;
};

export type ICarrinhoItem = IProdutoPDV & { quantidade: number };
