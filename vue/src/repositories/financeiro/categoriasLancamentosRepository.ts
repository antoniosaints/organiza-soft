import axiosService from "../../services/http/axiosService";
import ICategoria from "@/types/financeiro/ICategoria";
interface IGetAllCategoriasTransacao {
    data: ICategoria[];
    total: number;
    pages: number;
}
export default class CategoriasLancamentosRepository {
    static async get(id: number): Promise<ICategoria> {
        const { data } = await axiosService.get(`/financeiro/categoria/${id}`);
        return data.data;
    }
    static async getAll(limit: number, page: number, search?: string | undefined): Promise<IGetAllCategoriasTransacao> {
        const { data } = await axiosService.get(`/financeiro/categoria?limit=${limit}&page=${page}&search=${search}`);
        return data;
    }
    static async create(transacao: ICategoria): Promise<any> {
        const { data } = await axiosService.post(`/financeiro/categoria`, transacao);
        return data.data;
    }
    static async update(id: number, transacao: ICategoria): Promise<any> {
        const { data } = await axiosService.put(`/financeiro/categoria/${id}`, transacao);
        return data.data;
    }
    static async delete(id: number): Promise<any> {
        const { data } = await axiosService.delete(`/financeiro/categoria/${id}`);
        return data.data;
    }
}