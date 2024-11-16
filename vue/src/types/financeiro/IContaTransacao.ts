import ITransacao from "./ILancamentos"

export default interface IContaTransacao {
    id?: number
    conta: string
    saldo?: number
    regra?: string
    userId: number
    cor: string
    descricao?: string
    Transacao?: ITransacao[]
}