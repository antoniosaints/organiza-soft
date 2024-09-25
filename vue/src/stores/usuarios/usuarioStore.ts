import { UsuariosRepository } from "@/repositories/usuarios/usuariosRepository";
import IUsuario from "@/types/usuarios/IUsuario";
import { IUsuarioStore } from "@/types/usuarios/IUsuarioStore";
import toastUtil from "@/utils/toastUtil";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useUsuarioStore = defineStore("usuarioStore", (): IUsuarioStore => {
    const usuarios = ref<IUsuario[]>([]);
    const total = ref<number>(0);
    const limit = ref<string>('10');
    const page = ref<number>(1);
    const search = ref<string>('');

    const getUsuarios = async (): Promise<void> => {
        try {
            const { data, total: totalUsuarios } = await UsuariosRepository.getAll(Number(limit.value), page.value, search.value);
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
        page,
        search
    };
});
