import { ICarrinhoItem } from "./ICarrinhoPdv";
import { IMetodoPagamento } from "./IVenda";

export interface ICreateVenda {
    itens: ICarrinhoItem[];
    formaPagamento: IMetodoPagamento;
    cliente: number | null;
    vendedor: number;
    descricao: string;
    desconto?: number;
}