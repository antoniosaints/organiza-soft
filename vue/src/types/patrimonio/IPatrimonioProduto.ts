import { IPatrimonioCategoria } from "./IPatrimonioCategoria";

export interface IPatrimonioProduto {
  id?: number;
  produto: string;
  cor: string;
  codigoBarra?: string;
  controlado: string;
  unidade: string;
  produzido: string;
  ncm?: string;
  cest?: string;
  origem: string;
  cfop?: number;
  contaSistemaId?: number;
  categoriaId: number | null;
  descricao?: string;
  sku: string;
  preco: number;
  dataCriado?: string;
  dataAtualizado?: string;
  Categoria?: IPatrimonioCategoria;
}
