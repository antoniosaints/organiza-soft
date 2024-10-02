export interface IAccountData {
    id: number,
    conta: string,
    email: string,
    slug: string,
    descricao: string,
    plano: "free" | "pro" | "admin",
    status: "ativa" | "inativa" | "cancelada" | "vencida",
    stripeCustomerId: string,
    stripeSubscriptionId: string | null,
    dataCriado: string,
    dataAtualizada: string
}
