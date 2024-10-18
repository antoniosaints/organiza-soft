import IParcelamento from "./IParcelamento";
import { IStatusTransacao } from "./IStatusTransacao";

export default interface ITransacao {
    id?: number;
    clienteId: number;
    operacao: string;
    natureza: string;
    contaId: number;
    formaPagamentoId: number;
    categoriasId: number;
    parcelado: string;
    valor: number;
    status: IStatusTransacao;
    desconto?: number;
    valorFinal: number;
    dataEfetivado?: Date;
    dataLancamento?: Date;
    descricao?: string;
    Parcelamento?: IParcelamento[];
  }
  