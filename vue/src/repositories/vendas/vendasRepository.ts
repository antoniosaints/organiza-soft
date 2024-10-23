import axiosService from "@/services/http/axiosService";
import { ICreateVenda } from "@/types/vendas/ICreateVenda";
import { IVenda } from "@/types/vendas/IVenda";

export default class VendasRepository {
    static async get(id: number): Promise<IVenda> {
        const { data } = await axiosService.get(`vendas/${id}`);
        return data.data;
    }
    static async getAll(): Promise<IVenda[]> {
        const { data } = await axiosService.get(`vendas`);
        return data.data;
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
}