export default interface IParcelamento {
    id?: number;
    transacaoId: number;
    parcela: number;
    status: 'recebido' | 'pendente' | 'cancelada';
    valor: number;
    valorRecebido?: number;
    dataRecebimento?: Date;
    dataCadastro?: Date;
  }
  