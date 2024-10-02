import { Ref } from "vue";
import ICliente from "./ICliente";

export interface IClienteStore {
    getClientes(): Promise<void>;
    clientes: Ref<ICliente[]>;
    limit: Ref<string>;
    page: Ref<number>;
    total: Ref<number>;
    search: Ref<string>;
    selectedItens: Ref<number[]>;
    handleSelectItens(id: number): void;
    deleteSelectedItens(): Promise<void>;
}