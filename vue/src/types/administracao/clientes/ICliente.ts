type ICanaisVenda =
  | "email"
  | "telefone"
  | "whatsapp"
  | "instagram"
  | "facebook"
  | "twitter"
  | "telegram"
  | "sms"
  | "chat"
  | "linkedin"
  | "skype"
  | "correio"
  | "outro";
export default interface ICliente {
  id?: number;
  nome: string;
  email: string;
  status: "ativo" | "inativo";
  telefone?: string;
  telefoneAlternativo?: string;
  cpfCnpj?: string;
  endereco?: string;
  tipoCliente?: "fisica" | "juridica";
  instagram?: string;
  site?: string;
  canalPreferido?: ICanaisVenda;
  cep?: string;
  cidade?: string;
  pais?: string;
  saldoDevedor?: number;
  limiteCredito?: number;
  segmento?: string;
  scoreFinanceiro?: number;
  dataBloqueio?: Date | string;
  dataUltimaCompra?: Date | string;
  dataCriacao?: Date | string;
}
