import axiosService from "@/services/http/axiosService";
import { IAccountData } from "@/types/contas/IAccountData";

export class ContasRepository {
    static async get(id: number): Promise<IAccountData> {
        const { data } = await axiosService.get(`/contas-sistema/get-conta-sistema/${id}`);
        return data;
    }
    static async getAll(): Promise<IAccountData[]> {
        const { data } = await axiosService.get(`/contas-sistema/get-contas-sistema}`);
        return data;
    }
}