import { Ref } from "vue"
import IUsuario from "./IUsuario"

export interface IUsuarioFormularioStore {
    defaultData: Ref<IUsuario>
    data: Ref<IUsuario>
    userId: Ref<number|null>
    isModalOpen: Ref<boolean>,
    resetData: () => void
}
