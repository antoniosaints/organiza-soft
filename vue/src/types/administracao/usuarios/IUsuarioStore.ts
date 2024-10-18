import { Ref } from "vue";
import IUsuario from "./IUsuario";

export interface IUsuarioStore {
    getUsuarios(): Promise<void>;
    usuarios: Ref<IUsuario[]>;
    limit: Ref<string>;
    page: Ref<number>;
    total: Ref<number>;
    search: Ref<string>;
    selectedItens: Ref<number[]>;
    handleSelectItens(id: number): void;
    deleteSelectedItens(): Promise<void>;
}