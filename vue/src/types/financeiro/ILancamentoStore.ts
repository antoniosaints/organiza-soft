import { Ref } from "vue";
import ITransacao from "./ILancamentos";

export interface ILancamentosStore {
    getLancamentos(): Promise<void>;
    startDate: Ref<string>;
    endDate: Ref<string>;
    lancamentos: Ref<ITransacao[]>;
    limit: Ref<string>;
    page: Ref<number>;
    total: Ref<number>;
    search: Ref<string>;
    selectedItens: Ref<number[]>;
    handleSelectItens(id: number): void;
    deleteSelectedItens(): Promise<void>;
}