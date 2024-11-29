import ITransacao, { IFormaPagamento } from "@/types/financeiro/ILancamentos";
import axiosService from "../../services/http/axiosService";
import { ISchemaLancamento } from "@/stores/financeiro/lancamentos/lancamentoSchemaStore";
import { IResumoFinanceiro } from "@/types/financeiro/IResumoFinanceiro";

export default class LancamentosRepository {
  static async get(id: number): Promise<ITransacao> {
    const { data } = await axiosService.get(`financeiro/transacao/${id}`);
    return data.data;
  }
  static async efetivar(
    id: number,
    body: { date: string; formaPagamento: IFormaPagamento }
  ): Promise<ITransacao> {
    const { data } = await axiosService.post(
      `financeiro/transacao/efetivar/${id}`,
      body
    );
    return data;
  }
  static async efetivaParcela(id: number): Promise<ITransacao> {
    const { data } = await axiosService.get(
      `financeiro/transacao/efetivarParcela/${id}`
    );
    return data;
  }
  static async estornarParcela(id: number): Promise<ITransacao> {
    const { data } = await axiosService.get(
      `financeiro/transacao/estornarParcela/${id}`
    );
    return data;
  }
  static async estornarLancamento(id: number): Promise<ITransacao> {
    const { data } = await axiosService.get(
      `financeiro/transacao/estornarLancamento/${id}`
    );
    return data;
  }
  static async converterLancamento(id: number, natureza: "receita" | "despesa"): Promise<ITransacao> {
    const { data } = await axiosService.get(
      `financeiro/transacao/converterLancamento/${id}?natureza=${natureza}`
    );
    return data;
  }
  static async cancelarParcela(id: number): Promise<ITransacao> {
    const { data } = await axiosService.get(
      `financeiro/transacao/cancelarParcela/${id}`
    );
    return data;
  }
  static async getResume(dateFilter?: string[]): Promise<IResumoFinanceiro> {
    let date = "";
    if (dateFilter) date = dateFilter.join(",");
    const { data } = await axiosService.get(
      `/financeiro/transacao/resumo/totais?dataFiltro=${date}`
    );
    return data;
  }
  static async getAll(
    limit: number,
    page: number,
    natureza: string,
    status: string,
    search?: string | undefined,
    dateFilter?: string[],
  ): Promise<{ data: ITransacao[]; total: number }> {
    let filterDate = "";
    if (dateFilter) filterDate = dateFilter.join(",");
    const { data } = await axiosService.get(
      `financeiro/transacao?limit=${limit}&page=${page}&search=${search}&dataFiltro=${filterDate}&natureza=${natureza}&status=${status}`
    );
    return data;
  }
  static async getAllByConta(id: number): Promise<ITransacao[]> {
    const { data } = await axiosService.get(`financeiro/transacao?conta=${id}`);
    return data;
  }
  static async delete(id: number): Promise<any> {
    const { data } = await axiosService.delete(`financeiro/transacao/${id}`);
    return data.data;
  }
  static async update(id: number, transacao: ITransacao): Promise<any> {
    const { data } = await axiosService.put(
      `financeiro/transacao/${id}`,
      transacao
    );
    return data.data;
  }
  static async create(transacao: ISchemaLancamento): Promise<any> {
    const { data } = await axiosService.post(`financeiro/transacao`, transacao);
    return data.data;
  }
}
