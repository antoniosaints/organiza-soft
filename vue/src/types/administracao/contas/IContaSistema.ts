export interface IContaSistema {
    id?: number;
    conta: string;
    email: string;
    slug?: string;
    descricao?: string;
    plano: "free" | "pro" | "admin";
    status: "ativa" | "inativa" | "cancelada" | "vencida";
    telefone?: string;
    lancamentosRetroativos?: boolean;
    notificacaoEmail?: boolean;
    notificacaoTelegram?: boolean;
    redefinirSenha?: boolean;
    monitorarEstoque?: boolean;
    stripeCustomerId: string;
    stripeSubscriptionId?: string;
    dataCriado: string;
    dataAtualizada: string;
  }
  