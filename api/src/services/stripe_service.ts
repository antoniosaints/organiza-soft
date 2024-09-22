import Stripe from "stripe";
import { stripe } from "../libs/stripe";
import prismaService from "./prisma_service";

export class StripeService {
  constructor(readonly subscription: Stripe.Response<Stripe.Subscription>) {}

  async managerSubscription(customerId: string): Promise<void> {
    try {
      const conta = await prismaService.contasSistema.findFirst({ where:{stripeCustomerId: customerId}})
      if (conta) {
        if (this.isActive()) {
          await prismaService.contasSistema.update({ where:{id: conta.id}, 
            data:{
              plano: "pro",
              stripeSubscriptionId: this.subscription.id
            }
          })
        }else if (this.isInTrialPeriod()) {
          await prismaService.contasSistema.update({ where:{id: conta.id}, 
            data:{
              plano: "pro",
              stripeSubscriptionId: this.subscription.id
            }
          })
        }else if (!this.isActive()) {
          await prismaService.contasSistema.update({ where:{id: conta.id}, 
            data:{
              plano: "free",
              stripeSubscriptionId: this.subscription.id
            }
          })
        }
      }
    }catch (error) {
      console.log(error)
    }
  }
  isInTrialPeriod(): boolean {
    const currentTimestamp = Math.floor(Date.now() / 1000); // Timestamp atual em segundos
    if (!this.subscription.trial_end) {
      return false;
    }
    return (
      this.subscription.status === "trialing" &&
      currentTimestamp < this.subscription.trial_end
    );
  }
  isActive(): boolean {
    const currentTimestamp = Math.floor(Date.now() / 1000); // Timestamp atual em segundos
    return (
      this.subscription.status === "active" &&
      currentTimestamp >= this.subscription.current_period_start &&
      currentTimestamp <= this.subscription.current_period_end
    );
  }
  isCanceled(): boolean {
    return this.subscription.cancel_at_period_end;
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
    const trialStart = new Date(this.subscription.trial_start * 1000).toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" });
    const trialEnd = new Date(this.subscription.trial_end * 1000).toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" });
    return {
      trialStart,
      trialEnd,
    };
  }
  getPaymentPeriod() {
    const periodStart = new Date(this.subscription.current_period_start * 1000).toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" });
    const periodEnd = new Date(this.subscription.current_period_end * 1000).toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" });
    return {
      periodStart,
      periodEnd
    };
  }
  static async createCustomer(email: string, name: string): Promise<any> {
    const customer = await stripe.customers.create({
      email,
      name,
    });
    return customer;
  }
  static async createCustomerPortal(customerId: string, urlRedirect: string): Promise<any> {
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
    const canceledSubscription = await stripe.subscriptions.cancel(
      subscriptionId
    );
    return canceledSubscription;
  }
}
