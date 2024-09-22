import { Request, Response } from "express";
import { StripeService } from "../../services/stripe_service";

export const createSubscriptionStripe = async (req: Request, res: Response) => {
    const { customerId, priceId } = req.body;

    try {
        const subscription = await StripeService.createSubscription(customerId, priceId);
        res.json(subscription);
    } catch (error: any) {
        res.status(500).send(error);
    }
}