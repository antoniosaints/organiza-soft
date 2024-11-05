import { Autorize } from "@/autorization";
import { UsuariosRepository } from "@/repositories/administracao/usuarios/usuariosRepository";
import IUsuario from "@/types/administracao/usuarios/IUsuario";
import { IUsuarioStore } from "@/types/administracao/usuarios/IUsuarioStore";
import { ScToastUtil } from "@/utils/scToastUtil";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useUsuarioStore = defineStore("usuarioStore", (): IUsuarioStore => {
    const usuarios = ref<IUsuario[]>([]);
    const total = ref<number>(0);
    const limit = ref<string>('10');
    const page = ref<number>(1);
    const search = ref<string>('');
    const selectedItens = ref<number[]>([]);

    const getUsuarios = async (): Promise<void> => {
        try {
            if (!Autorize.can("visualizar", "usuarios")) return;
            const { data, total: totalUsuarios } = await UsuariosRepository.getAll(Number(limit.value), page.value, search.value);
            usuarios.value = data;
            total.value = totalUsuarios;
        } catch (error: any) {
            const errorMessage = error?.response?.data?.message || "Erro desconhecido.";
            ScToastUtil.error(errorMessage);
        }
    };

    const handleSelectItens = (id: number) => {
        if (selectedItens.value.includes(id)) {
          selectedItens.value = selectedItens.value.filter((item) => item !== id);
        } else {
          selectedItens.value.push(id);
        }
      };
  
      const deleteSelectedItens = async () => {
        try {
          if (!Autorize.can("deletar", "usuarios")) return;
          await Promise.all(
            selectedItens.value.map(async (id) => {
              await UsuariosRepository.delete(id);
            })
          );
          page.value = 1;
          await getUsuarios();
          selectedItens.value = [];
          ScToastUtil.success("Itens deletados com sucesso.");
        } catch (error: any) {
          const errorMessage =
            error?.response?.data?.message || "Erro desconhecido.";
          ScToastUtil.error(errorMessage);
        }
      };
  

    return {
        getUsuarios,
        usuarios,
        total,
        limit,
        page,
        search,
        selectedItens,
        handleSelectItens,
        deleteSelectedItens,
    };
});
