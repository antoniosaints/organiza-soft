export default interface ICliente {
  id?: number;
  nome: string;
  email: string;
  status: "ativo" | "inativo";
  telefone?: string;
  endereco?: string;
  dataCriacao?: Date;
  dataBloqueio?: Date;
}
