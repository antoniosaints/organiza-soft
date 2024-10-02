export interface IPatrimonioProduto {
  id?: number;
  produto: string;
  cor: string;
  contaSistemaId?: number;
  categoriaId?: number | string;
  descricao?: string;
  sku: string;
  preco: number;
  dataCriado?: Date;
  dataAtualizado?: Date;
}
