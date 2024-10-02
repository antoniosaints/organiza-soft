import axiosService from "@/services/http/axiosService";
import { IPatrimonioCategoria } from "@/types/patrimonio/IPatrimonioCategoria";

export class CategoriasRepository {
    static async get(id: number): Promise<IPatrimonioCategoria> {
        const { data } = await axiosService.get(`patrimonio/categoria/${id}`);
        return data.data;
    }
    static async getAll(): Promise<IPatrimonioCategoria[]> {
        const { data } = await axiosService.get(`patrimonio/categoria`);
        return data.data;
    }
    static async create(user: IPatrimonioCategoria): Promise<any> {
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