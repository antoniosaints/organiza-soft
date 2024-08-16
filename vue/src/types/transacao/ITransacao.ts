import IParcelamento from "./IParcelamento";

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
    status: string;
    planoId?: number;
    servicoId?: number;
    parcelamentoId?: number;
    desconto?: number;
    valorFinal: number;
    dataEfetivado?: Date;
    dataLancamento?: Date;
    descricao?: string;
    Parcelamento?: IParcelamento[];
  }
  