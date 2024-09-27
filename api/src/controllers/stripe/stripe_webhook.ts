import { Request, Response } from "express";
import "dotenv/config";
import { StripeService } from "../../services/stripe_service";
import Stripe from "stripe";
import { stripe } from "../../libs/stripe";

export const stripeWebhook = async (req: Request, res: Response) => {
  const sig = req.headers['stripe-signature'] as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET as string
    );
  } catch (err: any) {
    console.log(`Erro de webhook: ${err.message}`);
    return res.status(400).send(`Webhook error: ${err.message}`);
  }
  
  switch (event.type) {
    case "customer.subscription.deleted":
    case "customer.subscription.updated":
      const subscription = event.data.object;
      const StripeClass = new StripeService(subscription);
      await StripeClass.managerSubscription(subscription.customer as string);
      break;
    case "customer.deleted":
      await StripeService.cancelAccountByWebhook(event.data.object.id);
      break;
    default:
      console.log(`Evento WEBHOOK: ${event.type}`);
  }

  res.json({ received: true });
};
