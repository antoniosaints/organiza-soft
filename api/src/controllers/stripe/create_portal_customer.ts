import { Request, Response } from "express";
import { StripeService } from "../../services/stripe_service";
import "dotenv/config";

export const createPortalCustomer = async (req: Request, res: Response) => {
    try {
        const baseURL = process.env.BASE_URL_FRONT;
        const {customerId} = req.body;
        const session = await StripeService.createCustomerPortal(
          customerId,
          `${baseURL}/assinatura?backtoportal=true`
        );
        res.json(session);
    }catch (error: any) {
        res.status(500).send({message: "Erro ao criar o portal do assinante", error: error.raw.message});
    }
};
