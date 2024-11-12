import { IStatusTransacao } from "./IStatusTransacao";

export default interface IParcelamento {
    id?: number;
    transacaoId: number;
    parcela: number;
    tipo: "parcela" | "entrada" | "ajuste"
    status: IStatusTransacao;
    valor: number;
    valorRecebido?: number;
    desconto?: number;
    dataVencimento?: Date | string;
    dataRecebimento?: Date | string;
    dataCadastro?: Date | string;
  }
  