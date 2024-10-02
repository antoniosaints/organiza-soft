import { IStatusTransacao } from "./IStatusTransacao";

export default interface IParcelamento {
    id?: number;
    transacaoId: number;
    parcela: number;
    status: IStatusTransacao;
    valor: number;
    valorRecebido?: number;
    dataRecebimento?: Date;
    dataCadastro?: Date;
  }
  