import { UsuariosRepository } from "@/repositories/usuarios/usuariosRepository";
import IUsuario from "@/types/usuarios/IUsuario";
import toastUtil from "@/utils/toastUtil";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useUsuarioStore = defineStore("usuarioStore", () => {
    const usuarios = ref<IUsuario[]>([]);
    const getUsuarios = async (): Promise<IUsuario[] | undefined> => {
        try {
            const data = await UsuariosRepository.getAll();
            usuarios.value = data;
            return data;
        } catch (error: any) {
            toastUtil.error(error.response.data.message, "Ops..");
        }
    };

    return {
        getUsuarios,
        usuarios
    };
});