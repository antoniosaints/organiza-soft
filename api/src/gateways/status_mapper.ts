type StatusMap = "pago" | "pendente" | "cancelado" | "estornado" | "processando";
type Gateways = "mercadoPago";

const statusMap: Record<Gateways, Record<string, StatusMap>> = {
  mercadoPago: {
    pending: "pendente",
    approved: "pago",
    authorized: "pendente",
    in_process: "processando",
    in_mediation: "processando",
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
