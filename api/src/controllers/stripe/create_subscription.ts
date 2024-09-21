import { Request, Response } from "express";
import { stripe } from "../../libs/stripe";

export const createSubscriptionStripe = async (req: Request, res: Response) => {
    const { customerId, priceId } = req.body;

    try {
        const subscription = await stripe.subscriptions.create({
            customer: customerId,
            items: [{ price: priceId }],
            expand: ['latest_invoice.payment_intent'],
        });

        res.json(subscription);
    } catch (error: any) {
        res.status(500).send(error);
    }
}