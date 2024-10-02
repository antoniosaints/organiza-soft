import { Ref } from "vue"
import ICliente from "./ICliente"

export interface IClienteFormularioStore {
    defaultData: Ref<ICliente>
    data: Ref<ICliente>
    refId: Ref<number|null>
    isModalOpen: Ref<boolean>,
    resetData: () => void
}
