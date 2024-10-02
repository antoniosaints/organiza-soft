import { Ref } from "vue";
import { IPatrimonioProduto } from "./IPatrimonioProduto";

export interface IProdutoStore {
    getProdutos(): Promise<void>;
    produtos: Ref<IPatrimonioProduto[]>;
    limit: Ref<string>;
    page: Ref<number>;
    total: Ref<number>;
    search: Ref<string>;
    selectedItens: Ref<number[]>;
    handleSelectItens(id: number): void;
    deleteSelectedItens(): Promise<void>;
}