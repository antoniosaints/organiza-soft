import axiosService from "@/services/http/axiosService";
import { IPatrimonioCategoria } from "@/types/patrimonio/IPatrimonioCategoria";

export class CategoriasRepository {
    static async get(id: number): Promise<IPatrimonioCategoria> {
        const { data } = await axiosService.get(`patrimonio/categoria/${id}`);
        return data.data;
    }
    static async getAll(limit: number, page: number, search?: string | undefined): Promise<{ data: IPatrimonioCategoria[], total: number}> {
        const { data } = await axiosService.get(`patrimonio/categoria?limit=${limit}&page=${page}&search=${search}`);
        return data;
    }
    static async create(user: IPatrimonioCategoria): Promise<IPatrimonioCategoria> {
        const { data } = await axiosService.post(`patrimonio/categoria`, user);
        return data.data;
    }
    static async update(id: number, user: IPatrimonioCategoria): Promise<any> {
        const { data } = await axiosService.put(`patrimonio/categoria/${id}`, user);
        return data.data;
    }
    static async delete(id: number): Promise<any> {
        const { data } = await axiosService.delete(`patrimonio/categoria/${id}`);
        return data.data;
    }
}