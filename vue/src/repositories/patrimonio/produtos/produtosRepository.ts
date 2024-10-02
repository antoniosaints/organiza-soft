import axiosService from "@/services/http/axiosService";
import { IPatrimonioProduto } from "@/types/patrimonio/IPatrimonioProduto";

export class ProdutosRepository {
    static async get(id: number): Promise<IPatrimonioProduto> {
        const { data } = await axiosService.get(`patrimonio/produto/${id}`);
        return data.data;
    }
    static async getAll(limit: number, page: number, search?: string | undefined): Promise<{ data: IPatrimonioProduto[], total: number}> {
        const { data } = await axiosService.get(`patrimonio/produto?limit=${limit}&page=${page}&search=${search}`);
        return data;
    }
    static async create(user: IPatrimonioProduto): Promise<any> {
        const { data } = await axiosService.post(`patrimonio/produto`, user);
        return data.data;
    }
    static async update(id: number, user: IPatrimonioProduto): Promise<any> {
        const { data } = await axiosService.put(`patrimonio/produto/${id}`, user);
        return data.data;
    }
    static async delete(id: number): Promise<any> {
        const { data } = await axiosService.delete(`patrimonio/produto/${id}`);
        return data.data;
    }
}