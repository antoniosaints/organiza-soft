import { Ref } from "vue";
import { IVenda } from "./IVenda";

export interface IVendaStore {
    getVendas(dateFilter?: string[]): Promise<void>;
    vendas: Ref<IVenda[]>;
    limit: Ref<string>;
    page: Ref<number>;
    total: Ref<number>;
    search: Ref<string>;
    selectedItens: Ref<number[]>;
    handleSelectItens(id: number): void;
    deleteSelectedItens(): Promise<void>;
}