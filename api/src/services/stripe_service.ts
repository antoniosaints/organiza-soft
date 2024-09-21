import { stripe } from "../libs/stripe";

export class StripeService {
  static async createCustomer(email: string, name: string): Promise<any> {
    const customer = await stripe.customers.create({
      email,
      name,
    });
    return customer;
  }
  static async createSubscription(customerId: string, planId: string): Promise<any> {
    const subscription = await stripe.subscriptions.create({
      customer: customerId,
      items: [{ plan: planId }],
      expand: ["latest_invoice.payment_intent"],
    });

    return subscription;
  }
  static async cancelSubscription(subscriptionId: string): Promise<any> {
    const canceledSubscription = await stripe.subscriptions.cancel(subscriptionId);
    return canceledSubscription;
  }
}
