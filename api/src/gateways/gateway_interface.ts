interface IOrderBase {
    amount: number;
    customerEmail: string;
    customerName: string;
    product: string;
    idempotencyKey: string;
    id: string;
    webhookUrl: string;
}
export interface IOrderPayment extends IOrderBase {}
export interface IOrderPreference extends IOrderBase {quantity: number; maxInstallments?: number;}
export interface IGatewayPayment {
    createPayment(order: IOrderPayment): Promise<any>;
    createPreference(order: IOrderPreference): Promise<any>;
    getPayment(id: string): Promise<any>;
}