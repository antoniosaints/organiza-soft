export type IStatusVendas =
  | "pendente"
  | "pago"
  | "cancelado"
  | "processando"
  | "estornado";
export type IMetodoPagamento =
  | "pix"
  | "dinheiro"
  | "cartao"
  | "transferencia"
  | "boleto"
  | "cheque";
export interface IVenda {
  id?: number | string;
  uniqueId?: string;
  contaSistemaId?: number;
  clienteId?: number;
  vendedorId?: number;
  valor: number;
  status: IStatusVendas;
  desconto?: number;
  valorDesconto?: number;
  descricao?: string;
  metodoPagamento?: IMetodoPagamento;
  dataCriacao?: Date | string;
  Cliente?: {
    nome: string;
    email: string;
  }
}
