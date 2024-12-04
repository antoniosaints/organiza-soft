import { Ref } from "vue";
import ITransacao from "./ILancamentos";

export interface ILancamentosStore {
    getLancamentos(dateFilter?: string[]): Promise<void>;
    lancamentos: Ref<ITransacao[]>;
    isLoading: Ref<boolean>;
    limit: Ref<string>;
    status: Ref<"todos" | "pendente" | "recebido" | "cancelada">;
    natureza: Ref<"todos" | "receita" | "despesa">;
    page: Ref<number>;
    total: Ref<number>;
    search: Ref<string>;
    selectedItens: Ref<number[]>;
    isModalFilterOpen: Ref<boolean>;
    handleSelectItens(id: number): void;
    deleteSelectedItens(): Promise<void>;
}