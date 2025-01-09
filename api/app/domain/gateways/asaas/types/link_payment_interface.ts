interface ICallback {
  successUrl: string;
  autoRedirect?: boolean;
}
export interface LinkPayment {
  name: string;
  description?: string;
  endDate?: string;
  value?: number;
  billingType?: "BOLETO" | "CREDIT_CARD" | "PIX";
  chargeType: "DETACHED" | "RECURRENT" | "INSTALLMENT";
  maxInstallmentCount?: number;
  dueDateLimitDays: number;
  subscriptionCycle?: "MONTHLY" | "BIMONTHLY" | "WEEKLY" | "BIWEEKLY" | "QUARTERLY" | "SEMIANNUALY" | "YEARLY";
  notificationEnabled?: boolean;
  callback?: ICallback;
  isAddressRequired?: boolean;
}