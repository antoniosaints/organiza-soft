import ITransacao from "./ILancamentos"

export default interface ICategoria {
    id?: number
    categoria: string
    cor: string
    _count?: {
        FinanceiroTransacao?: number
    }
    Transacao?: ITransacao[]
}