import { IAssinaturaContrato } from "./IContrato";

export interface IAssinaturaBloqueio {
  id?: number;
  contaSistemaId?: number;
  motivo: string;
  dataBloqueio?: string;
  dataDesbloqueio?: string;
  assinaturaId: number;
  Assinatura?: IAssinaturaContrato;
}
