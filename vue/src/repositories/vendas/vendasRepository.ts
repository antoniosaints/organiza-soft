import axiosService from "@/services/http/axiosService";
import { ICreateVenda } from "@/types/vendas/ICreateVenda";
import { IVenda } from "@/types/vendas/IVenda";

export default class VendasRepository {
    static async get(id: number): Promise<IVenda> {
        const { data } = await axiosService.get(`vendas/${id}`);
        return data.data;
    }
    static async getAll(limit: number, page: number, search: string = "", dateFilter?: string[]): Promise<{ data: IVenda[], total: number}> {
        let date = "";
        if (dateFilter) date = dateFilter.join(",");
        const { data } = await axiosService.get(`vendas?limit=${limit}&page=${page}&search=${search}&dataFiltro=${date}`);
        return data;
    }
    static async getPix(id: number): Promise<string> {
        const { data } = await axiosService.get(`vendas/pix/${id}`);
        return data.data;
    }
    static async getCheckout(id: number): Promise<string> {
        const { data } = await axiosService.get(`vendas/checkout/${id}`);
        return data.data;
    }
    static async create(order: ICreateVenda): Promise<any> {
        const { data } = await axiosService.post(`vendas`, order);
        return data.data;
    }
    static async update(id: number, order: IVenda): Promise<any> {
        const { data } = await axiosService.put(`vendas/${id}`, order);
        return data.data;
    }
    static async delete(id: number): Promise<any> {
        const { data } = await axiosService.delete(`vendas/${id}`);
        return data.data;
    }
}