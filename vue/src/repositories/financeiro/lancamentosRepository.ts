import ITransacao from "@/types/financeiro/ILancamentos";
import axiosService from "../../services/http/axiosService";

export default class LancamentosRepository {
    static async get(id: number): Promise<ITransacao> {
        const { data } = await axiosService.get(`financeiro/transacao/${id}`);
        return data;
    }
    static async getAll(limit: number, page: number, search?: string | undefined): Promise<{ data: ITransacao[], total: number}> {
        const { data } = await axiosService.get(`financeiro/transacao?limit=${limit}&page=${page}&search=${search}`);
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
        const { data } = await axiosService.put(`financeiro/transacao/${id}`, transacao);
        return data.data;
    }
    static async create(transacao: ITransacao): Promise<any> {
        const { data } = await axiosService.post(`financeiro/transacao`, transacao);
        return data.data;
    }
}