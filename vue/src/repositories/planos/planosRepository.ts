import axiosService from "@/services/http/axiosService";
import IPlano from "@/types/assinaturas/IPlano";

export default class PlanosRepository {
    static async get(id: number): Promise<IPlano> {
        const { data } = await axiosService.get(`plano/${id}`);
        return data.data;
    }
    static async getAll(): Promise<IPlano[]> {
        const { data } = await axiosService.get(`plano`);
        return data.data;
    }
    static async create(plano: IPlano): Promise<any> {
        const { data } = await axiosService.post(`plano`, plano);
        return data.data;
    }
    static async update(id: number, plano: IPlano): Promise<any> {
        const { data } = await axiosService.put(`plano/${id}`, plano);
        return data.data;
    }
}