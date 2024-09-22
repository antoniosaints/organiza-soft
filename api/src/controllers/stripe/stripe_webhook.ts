import { Request, Response } from "express";
import "dotenv/config";
import { StripeService } from "../../services/stripe_service";

export const stripeWebhook = async (req: Request, res: Response) => {
  let event = req.body;

  switch (event.type) {
    case "customer.subscription.deleted":
    case "customer.subscription.updated":
    case "customer.subscription.created":
      const subscription = event.data.object;
      const StripeClass = new StripeService(subscription);
      StripeClass.managerSubscription(subscription.customer);
      break;
    default:
      console.log(`Evento WEBHOOK: ${event.type}`);
  }

  res.json({ received: true });
};
