import { Ref } from "vue"
import IUsuario from "./IUsuario"

export interface IUsuarioFormularioStore {
    data_default: Ref<IUsuario>
    data: Ref<IUsuario>
    ref_id: Ref<number|null>
    modalState: Ref<boolean>
}
