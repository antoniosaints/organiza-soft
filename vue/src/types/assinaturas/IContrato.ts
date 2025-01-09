import ICliente from "../administracao/clientes/ICliente";
import { IAssinaturaBloqueio } from "./IBloqueio";
import IPlano from "./IPlano";

export interface IAssinaturaContrato {
  id?: number;
  contaSistemaId?: number;
  clienteId: number;
  planoId: number;
  dataInicio: string | Date;
  dataFim: string | Date;
  status?: Status;
  dataBloqueio?: string | Date;
  dataCriacao?: string | Date;
  dataDesbloqueio?: string | Date;
  Cliente?: ICliente;
  Plano?: IPlano;
  Bloqueio?: IAssinaturaBloqueio[];
}


type Status = "ativa" | "vencida" | "cancelada";
