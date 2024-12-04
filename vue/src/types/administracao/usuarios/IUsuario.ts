import { IRegra } from "./IRegra";

export default interface IUsuario {
  id?: number;
  nome: string;
  email: string;
  senha: string;
  status: "ativo" | "inativo";
  regra: IRegra;
  resetarSenha?: boolean;
  lancamentosRetroativos?: boolean;
  recebimentosRetroativos?: boolean;
  pagamentosRetroativos?: boolean;
  descontoMaximoVendaPdv?: boolean;
  jurosMaximoLancamento?: boolean;
  jurosMaximoRenegociacao?: boolean;
  descontoMaximoLancamento?: boolean;
  dashboardFinanceiro?: boolean;
  dashboardVendas?: boolean;
  dashboardPatrimonio?: boolean;
  dashboardCrm?: boolean;
  rh?: boolean;
  assistenteIa?: boolean;
  crm?: boolean;
  vendas?: boolean;
  financeiro?: boolean;
  patrimonio?: boolean;
  servicos?: boolean;
  assinantes?: boolean;
  anotacoes?: string;
  telefone?: string;
  dataCriacao?: string | Date;
}
