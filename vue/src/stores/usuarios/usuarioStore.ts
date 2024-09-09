import { UsuariosRepository } from "@/repositories/usuarios/usuariosRepository";
import IUsuario from "@/types/usuarios/IUsuario";
import toastUtil from "@/utils/toastUtil";
import { defineStore } from "pinia";
import { Ref, ref } from "vue";

interface IUsuarioStore {
    getUsuarios(): Promise<void>;
    usuarios: Ref<IUsuario[]>;
    limit: Ref<string>;
    page: Ref<number>;
    total: Ref<number>;
}

export const useUsuarioStore = defineStore("usuarioStore", (): IUsuarioStore => {
    const usuarios = ref<IUsuario[]>([]);
    const total = ref<number>(0);
    const limit = ref<string>('10');
    const page = ref<number>(1);

    const getUsuarios = async (): Promise<void> => {
        try {
            const { data, total: totalUsuarios } = await UsuariosRepository.getAll(Number(limit.value), page.value);
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
        total,
        limit,
        page
    };
});
