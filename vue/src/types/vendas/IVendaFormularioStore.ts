import { Ref } from "vue"
import { IVenda } from "./IVenda"

export interface IVendaFormularioStore {
    defaultData: Ref<IVenda>
    data: Ref<IVenda>
    refId: Ref<number|null>
    isModalOpen: Ref<boolean>,
    isModalDetalhesOpen: Ref<boolean>,
    resetData: () => void
}
