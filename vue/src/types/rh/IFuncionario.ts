export interface IFuncionario {
  id?: number;
  contaSistemaId?: number;
  nome: string;
  cpf: string;
  dataNascimento: string;
  email?: string;
  telefone?: string;
  cargo?: string;
  dataAdmissao?: string;
  dataDemissao?: string;
  criadoPor?: number;
  status?: "ativo" | "inativo";
  datacriado?: string;
  dataAtualizado?: string;
}
