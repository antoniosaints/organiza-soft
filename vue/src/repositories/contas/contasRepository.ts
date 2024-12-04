import axiosService from "@/services/http/axiosService";
import { IContaSistema } from "@/types/administracao/contas/IContaSistema";

export class ContasRepository {
    static async get(id: number): Promise<IContaSistema> {
        const { data } = await axiosService.get(`/contas-sistema/get-conta-sistema/${id}`);
        return data;
    }
    static async getAll(): Promise<IContaSistema[]> {
        const { data } = await axiosService.get(`/contas-sistema/get-contas-sistema}`);
        return data;
    }
}