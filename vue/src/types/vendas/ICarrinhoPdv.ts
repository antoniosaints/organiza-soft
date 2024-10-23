export type IProdutoPDV = {
  id: number;
  produto: string;
  preco: number;
};

export type ICarrinhoItem = IProdutoPDV & { quantidade: number };
