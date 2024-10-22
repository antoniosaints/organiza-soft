type StatusMap = "aprovado" | "pendente" | "cancelado" | "estornado";
type Gateways = "mercadoPago";

const statusMap: Record<Gateways, Record<string, StatusMap>> = {
  mercadoPago: {
    pending: "aprovado",
    approved: "aprovado",
    authorized: "pendente",
    in_process: "pendente",
    in_mediation: "pendente",
    rejected: "cancelado",
    cancelled: "cancelado",
    refunded: "estornado",
    charged_back: "estornado",
  },
};

export function padronizarStatusGateway(gateway: Gateways, status: string) {
  if (statusMap[gateway] && statusMap[gateway][status]) {
    return statusMap[gateway][status];
  } else {
    throw new Error(
      `Status desconhecido ou não mapeado: ${status} para o gateway ${gateway}`
    );
  }
}
