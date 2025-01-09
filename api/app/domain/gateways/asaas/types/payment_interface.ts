export interface Payment {
  customer: string;
  billingType: "BOLETO" | "CREDIT_CARD" | "PIX";
  dueDate: string;
  value: number;
  description?: string;
  externalReference?: string;
  daysAfterDueDateToRegistrationCancellation?: number;
}