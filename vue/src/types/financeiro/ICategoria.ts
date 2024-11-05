import ITransacao from "./ILancamentos"

export default interface ICategoria {
    id?: number
    categoria: string
    cor: string
    Transacao?: ITransacao[]
}