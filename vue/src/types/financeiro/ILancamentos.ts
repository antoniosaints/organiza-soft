import IUsuario from "../administracao/usuarios/IUsuario";
import ICategoria from "./ICategoria";
import IParcelamento from "./IParcelamento";
import { IStatusTransacao } from "./IStatusTransacao";

export interface IFormaPagamento {
  forma: string;
  cor: string;
}
export interface IContasLancamentos {
  conta: string;
  saldo: number;
  regra: "privada" | "publica";
  userId: number;
  cor?: string;
  descricao: string;
}
export default interface ITransacao {
  id?: number;
  contaSistemaId?: number;
  codigoLancamento?: string;
  valor: number;
  descricao?: string;
  categoriasId: number;
  contaId: number;
  dataEfetivado?: string | Date;
  usuarioEfetivou?: number;
  dataVencimento?: string | Date;
  dataLancamento?: string | Date;
  usuarioLancamento?: number;
  codigoNfe?: string;
  codigoServico?: string;
  taxaJuros?: number;
  juros?: number;
  taxaDesconto?: number;
  desconto?: number;
  moeda?: string;
  taxaCambio?: number;
  referenciaExterna?: string;
  formaPagamentoId: number;
  natureza: "receita" | "despesa";
  operacao: "entrada" | "saida" | "transferencia" | "ajuste";
  parcelado?: "sim" | "nao";
  status: IStatusTransacao;
  valorFinal?: number;
  FinanceiroParcelamento?: IParcelamento;
  Categoria?: ICategoria;
  Conta?: IContasLancamentos;
  FormaPagamento?: IFormaPagamento;
  UsuarioLancamento?: IUsuario;
}