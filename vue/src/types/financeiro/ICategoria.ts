import ITransacao from "./ITransacao"

export default interface ICategoria {
    id?: number
    categoria: string
    cor: string
    Transacao?: ITransacao[]
}