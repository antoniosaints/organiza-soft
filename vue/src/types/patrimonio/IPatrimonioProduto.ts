import { IPatrimonioCategoria } from "./IPatrimonioCategoria";

export interface IPatrimonioProduto {
  id?: number;
  produto: string;
  cor: string;
  contaSistemaId?: number;
  categoriaId: number;
  descricao?: string;
  sku: string;
  preco: number;
  dataCriado?: string;
  dataAtualizado?: string;
  Categoria?: IPatrimonioCategoria;
}
