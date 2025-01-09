import { IAssinaturaItemOnPlano } from "./IItensOnProdutos";

export interface IAssinaturaItem {
  id?: number; 
  contaSistemaId?: number;
  nome: string;
  valor: number; 
  tipo: TipoItemAssinatura; 
  descricao?: string; 
  dataCriacao?: string; 
  dataAtualizado?: string; 
  AssinaturaItemOnPlano?: IAssinaturaItemOnPlano[]; 
}

type TipoItemAssinatura = "produto" | "servico" | "outro";