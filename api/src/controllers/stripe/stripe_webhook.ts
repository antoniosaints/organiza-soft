import { Request, Response } from "express";
import { stripe } from "../../libs/stripe";
import "dotenv/config";

export const stripeWebhook = async (req: Request, res: Response) => {
  const signature = req.headers["stripe-signature"] as string;
  let event;
  const stripeWebhookSecret = process.env.STRIPE_WEBHOOK_SECRET as string;

  if (!stripeWebhookSecret) {
    throw new Error("Stripe webhook secret not found");
  }

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      signature,
      stripeWebhookSecret
    );
  } catch (err: any) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  switch (event.type) {
    case "invoice.payment_succeeded":
      const invoice = event.data.object;
      console.log(`O pagamento de ${invoice.id} foi confirmado.`);
      break;
    case "customer.subscription.deleted":
      const subscription = event.data.object;
      console.log(`A assinatura ${subscription.id} foi excluida.`);
      break;
    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  res.json({ received: true });
};
