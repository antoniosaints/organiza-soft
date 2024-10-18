import { IRegra } from "./IRegra";

export default interface IUsuario {
  id?: number;
  nome: string;
  email: string;
  senha: string;
  status: 'ativo' | 'inativo';
  regra:  IRegra;
  grupoId: number;
  anotacoes?: string;
  telefone?: string;
  dataCriacao?: Date;
}
