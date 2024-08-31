import IUsuario from "@/types/usuarios/IUsuario";
import { defineStore } from "pinia";
import { Ref, ref } from "vue";

interface IUsuarioFormularioStore {
    data_default: Ref<IUsuario>
    data: Ref<IUsuario>
    ref_id: Ref<number|null>
    modalState: Ref<boolean>
}

export const useUsuarioFormularioStore = defineStore("usuarioFormularioStore", () : IUsuarioFormularioStore => {
    const data_default = ref<IUsuario>({
        nome: "",
        email: "",
        grupoId: 1,
        telefone: "",
        regra: "gerente",
        senha: "",
        status: "ativo",
    })

    const data = ref<IUsuario>({
        ...data_default.value
    });

    const ref_id = ref<number|null>(null);
    const modalState = ref(false);

    return {
        data,
        data_default,
        ref_id,
        modalState
    };
})