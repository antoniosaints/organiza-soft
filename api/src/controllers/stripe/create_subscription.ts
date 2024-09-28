import { Request, Response } from "express";
import { StripeService } from "../../services";

export const createSubscriptionStripe = async (req: Request, res: Response) => {
    const { customerId, priceId } = req.body;

    try {
        const subscription = await StripeService.createSubscription(customerId, priceId);
        res.json(subscription);
    } catch (error: any) {
        res.status(500).send({message: "Erro ao criar assinatura", error: error.raw.message});
    }
}