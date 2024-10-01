import { Autorize } from "@/autorization";
import axiosService from "@/services/http/axiosService";
import IUsuario from "@/types/usuarios/IUsuario";

export class UsuariosRepository {
    static async get(id: number): Promise<IUsuario> {
        if (!Autorize.can("visualizar", "usuarios")) return {} as IUsuario;
        const { data } = await axiosService.get(`usuario/${id}`);
        return data.data;
    }
    static async getAll(limit: number, page: number, search?: string | undefined): Promise<{ data: IUsuario[], total: number}> {
        if (!Autorize.can("visualizar", "usuarios")) return {} as { data: IUsuario[], total: number};
        const { data } = await axiosService.get(`usuario?limit=${limit}&page=${page}&search=${search}`);
        return data;
    }
    static async create(user: IUsuario): Promise<any> {
        if (!Autorize.can("criar", "usuarios")) return {} as IUsuario;
        const { data } = await axiosService.post(`usuario`, user);
        return data.data;
    }
    static async update(id: number, user: IUsuario): Promise<any> {
        if (!Autorize.can("atualizar", "usuarios")) return false;
        const { data } = await axiosService.put(`usuario/${id}`, user);
        return data.data;
    }
    static async delete(id: number): Promise<any> {
        if (!Autorize.can("deletar", "usuarios")) return {} as IUsuario;
        const { data } = await axiosService.delete(`usuario/${id}`);
        return data.data;
    }
}