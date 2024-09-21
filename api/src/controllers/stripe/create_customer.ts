import { Request, Response } from "express";
import { StripeService } from "../../services/stripe_service";

export const createCustomerStripe = async (req: Request, res: Response) => {
    const { name, email } = req.body;

    try {
        const customer = await StripeService.createCustomer(email, name);
        return res.status(200).json(customer);
    }catch (error: any) {
        return res.status(500).json({ error });
    }
}