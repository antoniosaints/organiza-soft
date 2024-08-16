export default interface IPlano {
  id?: number;
  nome: string;
  descricao?: string;
  preco: number;
  cor: string;
  dataCriacao?: Date;
  dataAtualizacao?: Date;
}
