import { Request, Response } from "express";
import { StripeService } from "../../services";

export const cancelSubscriptionStripe = async (req: Request, res: Response) => {
    const { subscriptionId } = req.body;

    try {
        const canceledSubscription = await StripeService.cancelSubscription(subscriptionId);
        res.json(canceledSubscription);
    } catch (error: any) {
        res.status(500).send(error.message);
    }
}