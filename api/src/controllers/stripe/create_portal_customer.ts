import { Request, Response } from "express";
import { StripeService } from "../../services/stripe_service";
import "dotenv/config";

export const createPortalCustomer = async (req: Request, res: Response) => {
    try {
        const baseURL = process.env.BASE_URL_FRONT;
        const {customerId} = req.body;
        const session = await StripeService.createCustomerPortal(
          customerId,
          `${baseURL}/administracao/usuarios?backtoportal=true`
        );
        res.json(session);
    }catch (error) {
        res.status(500).send(error);
    }
};
