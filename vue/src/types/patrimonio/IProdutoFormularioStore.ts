import { Ref } from "vue"
import { IPatrimonioProduto } from "./IPatrimonioProduto"

export interface IProdutoFormularioStore {
    defaultData: Ref<IPatrimonioProduto>
    data: Ref<IPatrimonioProduto>
    refId: Ref<number|null>
    isModalOpen: Ref<boolean>,
    resetData: () => void
}
