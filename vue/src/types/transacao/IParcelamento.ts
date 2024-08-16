export default interface IParcelamento {
    id?: number;
    transacaoId: number;
    parcela: number;
    status: string;
    valor: number;
    valorRecebido?: number;
    dataRecebimento?: Date;
    dataCadastro?: Date;
  }
  