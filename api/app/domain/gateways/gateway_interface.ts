interface IOrderBase {
    customerEmail: string;
    customerName: string;
    product: string;
    idempotencyKey: string;
    description: string;
    id: string;
    webhookUrl: string;
}
interface IItens {
    id: string,
    title: string,
    unit_price: number,
    quantity: number,
}
export interface IOrderPayment extends IOrderBase {amount: number}
export interface IOrderPreference extends IOrderBase {maxInstallments?: number; itens: IItens[]}
export interface IGatewayPayment {
    createPayment(order: IOrderPayment): Promise<any>;
    createPreference(order: IOrderPreference, itens: IItens[]): Promise<any>;
    getPayment(id: string): Promise<any>;
}