import { IAssinaturaContrato } from "./IContrato";
import { IAssinaturaItemOnPlano } from "./IItensOnProdutos";

export default interface IPlano {
  id?: number;
  contaSistemaId?: number;
  nome: string;
  periodoCobranca: PeriodoAssinantesPlanos;
  descricao?: string;
  preco: number;
  cor: string;
  dataCriacao?: string;
  dataAtualizacao?: string;
  Assinatura?: IAssinaturaContrato[];
  AssinaturaItemOnPlano?: IAssinaturaItemOnPlano[];
}

type PeriodoAssinantesPlanos = "mensal" | "trimestral" | "semestral" | "anual" | "quinzenal";
