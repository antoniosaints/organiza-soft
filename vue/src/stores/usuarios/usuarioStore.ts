import { UsuariosRepository } from "@/repositories/usuarios/usuariosRepository";
import IUsuario from "@/types/usuarios/IUsuario";
import toastUtil from "@/utils/toastUtil";
import { defineStore } from "pinia";
import { Ref, ref } from "vue";

interface IUsuarioStore {
    getUsuarios(limit?: number, page?: number): Promise<void>;
    usuarios: Ref<IUsuario[]>;
    total: Ref<number>;
}

export const useUsuarioStore = defineStore("usuarioStore", (): IUsuarioStore => {
    const usuarios = ref<IUsuario[]>([]);
    const total = ref<number>(0);

    const getUsuarios = async (limit: number = 10, page: number = 1): Promise<void> => {
        try {
            const { data, total: totalUsuarios } = await UsuariosRepository.getAll(limit, page);
            usuarios.value = data;
            total.value = totalUsuarios;
        } catch (error: any) {
            const errorMessage = error?.response?.data?.message || "Erro desconhecido.";
            toastUtil.error(errorMessage, "Ops..");
        }
    };

    return {
        getUsuarios,
        usuarios,
        total
    };
});
