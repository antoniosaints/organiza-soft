import axiosService from "@/services/http/axiosService";
import ICliente from "@/types/administracao/clientes/ICliente";

export class ClientesRepository {
    static async get(id: number): Promise<ICliente> {
        const { data } = await axiosService.get(`cliente/${id}`);
        return data.data;
    }
    static async getAll(limit: number, page: number, search?: string | undefined): Promise<{ data: ICliente[], total: number}> {
        const { data } = await axiosService.get(`cliente?limit=${limit}&page=${page}&search=${search}`);
        return data;
    }
    static async create(user: ICliente): Promise<ICliente> {
        const { data } = await axiosService.post(`cliente`, user);
        return data.data;
    }
    static async update(id: number, user: ICliente): Promise<any> {
        const { data } = await axiosService.put(`cliente/${id}`, user);
        return data.data;
    }
    static async delete(id: number): Promise<any> {
        const { data } = await axiosService.delete(`cliente/${id}`);
        return data.data;
    }
}