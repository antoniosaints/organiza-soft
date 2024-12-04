import Stripe from "stripe";
import { stripe } from "../../libs/stripe";
import prismaService from "../database/prisma_service";
import { PlanosSistema, Status } from "@prisma/client";

export class StripeService {
  constructor(readonly subscription: Stripe.Subscription) {}
  async updateContaSistema(contaId: number, plano: PlanosSistema, status: Status, stripeSubscriptionId: string | null) {
    await prismaService.contasSistema.update({
      where: { id: contaId },
      data: {
        plano,
        status,
        stripeSubscriptionId
      },
    });
  }
  async managerSubscription(customerId: string): Promise<void> {
    try {
      const conta = await prismaService.contasSistema.findFirst({
        where: { stripeCustomerId: customerId },
      });
      if (conta) {
        if (this.isActive() || this.isTrial()) {
          await this.updateContaSistema(conta.id, "pro", "ativa", this.subscription.id);
        } else if (this.isPastDue()) {
          await this.updateContaSistema(conta.id, "free", "vencida", this.subscription.id);
        } else if (this.isCanceled()) {
          await this.updateContaSistema(conta.id, "free", "cancelada", null);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
  isTrial(): boolean {
    return this.subscription.status === "trialing";
  }
  isActive(): boolean {
    return this.subscription.status === "active";
  }
  isPastDue(): boolean {
    return this.subscription.status === "past_due";
  }
  isCanceled(): boolean {
    return this.subscription.status === "canceled";
  }
  getCancelDate() {
    if (this.isCanceled() && this.subscription.canceled_at) {
      const date = new Date(this.subscription.canceled_at * 1000);
      return date.toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" });
    }
    return null;
  }

  getTrialPeriod() {
    if (!this.subscription.trial_end || !this.subscription.trial_start) {
      return null;
    }
    const trialStart = new Date(
      this.subscription.trial_start * 1000
    ).toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" });
    const trialEnd = new Date(
      this.subscription.trial_end * 1000
    ).toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" });
    return {
      trialStart,
      trialEnd,
    };
  }
  getPaymentPeriod() {
    const periodStart = new Date(
      this.subscription.current_period_start * 1000
    ).toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" });
    const periodEnd = new Date(
      this.subscription.current_period_end * 1000
    ).toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" });
    return {
      periodStart,
      periodEnd,
    };
  }
  static async cancelAccountByWebhook(customerId: string): Promise<any> {
    const conta = await prismaService.contasSistema.findFirst({
      where: { stripeCustomerId: customerId },
    });
    if (conta) {
      await prismaService.contasSistema.update({
        where: { id: conta.id },
        data: {
          status: "inativa",
          stripeCustomerId: "",
          plano: "free",
          stripeSubscriptionId: null,
        },
      });
    }
  }
  static async createCustomer(
    email: string,
    name: string,
    description: string = "",
    phone: string = "",
    address: any = {}
  ): Promise<any> {
    const customer = await stripe.customers.create({
      email,
      name,
      description,
      phone,
      address: {
        city: address?.city || "",
        country: address?.country || "",
        line1: address?.line1 || "",
        line2: address?.line2 || "",
        postal_code: address?.postal_code || "",
        state: address?.state || "",
      },
    });
    return customer;
  }
  static async createCustomerPortal(
    customerId: string,
    urlRedirect: string
  ): Promise<any> {
    const session = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: urlRedirect,
    });
    return session;
  }
  static async createSubscription(
    customerId: string,
    priceId: string,
    trialPeriod: boolean = false
  ): Promise<any> {
    const subscription = await stripe.subscriptions.create({
      customer: customerId,
      items: [{ price: priceId, quantity: 1 }],
      payment_behavior: "default_incomplete",
      trial_period_days: trialPeriod ? 7 : undefined,
      currency: "brl",
      expand: ["latest_invoice.payment_intent"],
    });

    return subscription;
  }
  static async cancelSubscription(subscriptionId: string): Promise<any> {
    const canceledSubscription =
      await stripe.subscriptions.cancel(subscriptionId);
    return canceledSubscription;
  }
}
