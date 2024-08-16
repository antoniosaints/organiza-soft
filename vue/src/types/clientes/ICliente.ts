export default interface ICliente {
  id?: number;
  nome: string;
  email: string;
  status: string;
  telefone?: string;
  endereco?: string;
  dataCriacao?: Date;
  dataBloqueio?: Date;
}
