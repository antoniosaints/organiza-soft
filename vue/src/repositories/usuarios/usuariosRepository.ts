import axiosService from "@/services/http/axiosService";
import IUsuario from "@/types/usuarios/IUsuario";

export class UsuariosRepository {
    static async get(id: number): Promise<IUsuario> {
        const { data } = await axiosService.get(`usuario/${id}`);
        return data.data;
    }
    static async getAll(limit: number, page: number, ): Promise<{ data: IUsuario[], total: number}> {
        const { data } = await axiosService.get(`usuario?limit=${limit}&page=${page}`);
        return data;
    }
    static async create(user: IUsuario): Promise<any> {
        const { data } = await axiosService.post(`usuario`, user);
        return data.data;
    }
    static async update(id: number, user: IUsuario): Promise<any> {
        const { data } = await axiosService.put(`usuario/${id}`, user);
        return data.data;
    }
    static async delete(id: number): Promise<any> {
        const { data } = await axiosService.delete(`usuario/${id}`);
        return data.data;
    }
}