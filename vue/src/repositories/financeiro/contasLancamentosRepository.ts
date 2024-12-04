import axiosService from "../../services/http/axiosService";
import IContaTransacao from "@/types/financeiro/IContaTransacao";

export default class ContasLancamentosRepository {
    static async get(id: number): Promise<IContaTransacao> {
        const { data } = await axiosService.get(`financeiro/contas/${id}`);
        return data.data;
    }
    static async getAll(limit: number, page: number, search?: string | undefined): Promise<{ data: IContaTransacao[], total: number}> {
        const { data } = await axiosService.get(`financeiro/contas?limit=${limit}&page=${page}&search=${search}`);
        return data;
    }
    static async delete(id: number): Promise<any> {
        const { data } = await axiosService.delete(`financeiro/contas/${id}`);
        return data.data;
    }
    static async update(id: number, transacao: IContaTransacao): Promise<any> {
        const { data } = await axiosService.put(`financeiro/contas/${id}`, transacao);
        return data.data;
    }
    static async create(transacao: IContaTransacao): Promise<IContaTransacao> {
        const { data } = await axiosService.post(`financeiro/contas`, transacao);
        return data.data;
    }
}