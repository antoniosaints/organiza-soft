import { Customer } from "./types/customer_interface";
import { LinkPayment } from "./types/link_payment_interface";
import { Payment } from "./types/payment_interface";

export type Environment = "sandbox" | "production";
export type Method = "GET" | "POST";

export class AsaasSDK {
  private apiKey: string;
  private baseUrl: string;

  constructor(apiKey: string, environment: Environment = "sandbox") {
    this.apiKey = apiKey;
    this.baseUrl =
      environment === "production"
        ? "https://www.asaas.com/api/v3"
        : "https://sandbox.asaas.com/api/v3";
  }

  private async request<T>(endpoint: string, method: Method = "GET", data?: unknown): Promise<T> {
    const headers = new Headers({
      "Content-Type": "application/json",
      access_token: this.apiKey,
    });

    const options: RequestInit = {
      method,
      headers,
    };

    if (data) options.body = JSON.stringify(data);

    const response = await fetch(`${this.baseUrl}${endpoint}`, options);

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Error ${response.status}: ${error?.message || "Unknown error"}`);
    }

    return response.json();
  }

  public async createCustomer(customer: Customer) {
    return this.request<Customer>("/customers", "POST", customer);
  }

  public async getCustomer(customerId: string) {
    return this.request<Customer>(`/customers/${customerId}`);
  }

  public async createPayment(payment: Payment) {
    return this.request<Payment>("/payments", "POST", payment);
  }

  public async getPayment(paymentId: string) {
    return this.request<Payment>(`/payments/${paymentId}`);
  }

  public async createLinkPayment(data: LinkPayment) {
    return this.request<LinkPayment>("/paymentLinks", "POST", data);
  }
}
