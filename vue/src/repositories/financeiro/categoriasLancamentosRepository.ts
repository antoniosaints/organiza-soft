import axiosService from "../../services/http/axiosService";
import { ISchemaLancamento } from "@/stores/financeiro/lancamentos/lancamentoSchemaStore";
import ICategoria from "@/types/financeiro/ICategoria";

export default class CategoriasLancamentosRepository {
    static async get(id: number): Promise<ICategoria> {
        const { data } = await axiosService.get(`/financeiro/categoria/${id}`);
        return data.data;
    }
    static async getAll(limit: number, page: number, search?: string | undefined): Promise<{ data: ICategoria[], total: number}> {
        const { data } = await axiosService.get(`/financeiro/categoria?limit=${limit}&page=${page}&search=${search}`);
        return data;
    }
    static async create(transacao: ISchemaLancamento): Promise<any> {
        const { data } = await axiosService.post(`/financeiro/categoria`, transacao);
        return data.data;
    }
}