import IUsuario from "@/types/usuarios/IUsuario";
import { defineStore } from "pinia";
import { Ref, ref } from "vue";

interface IUsuarioFormularioStore {
    data: Ref<IUsuario>
    ref_id: Ref<number|null>
    modalState: Ref<boolean>
}

export const useUsuarioFormularioStore = defineStore("usuarioFormularioStore", () : IUsuarioFormularioStore => {
    const data = ref<IUsuario>({
        email: "",
        grupoId: 1,
        nome: "",
        regra: "gerente",
        senha: "",
        status: "ativo",
    })

    const ref_id = ref<number|null>(null);
    const modalState = ref(false);

    return {
        data,
        ref_id,
        modalState
    };
})