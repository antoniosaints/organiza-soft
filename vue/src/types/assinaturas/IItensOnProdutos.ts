import { IAssinaturaItem } from "./IItens";
import IPlano from "./IPlano";

export interface IAssinaturaItemOnPlano {
  id?: number; 
  item: number; 
  qtdItens: number; 
  plano: number; 
  Plano?: IPlano; 
  Item?: IAssinaturaItem; 
}
