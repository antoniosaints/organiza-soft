import { Ref } from "vue"
import ITransacao from "./ILancamentos"

export interface ILancamentosFormularioStore {
    defaultData: Ref<ITransacao>
    data: Ref<ITransacao>
    refId: Ref<number|null>
    isModalOpen: Ref<boolean>,
    isModalDetalhesOpen: Ref<boolean>,
    isModalEfetivarOpen: Ref<boolean>,
    resetData: () => void
}
