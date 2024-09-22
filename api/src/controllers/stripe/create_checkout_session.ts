import { Request, Response } from "express";
import { stripe } from "../../libs/stripe";
import "dotenv/config";

export const createCheckoutSession = async (req: Request, res: Response) => {
  try {
    const baseURL = process.env.BASE_URL_FRONT;
    const { customerId, priceId } = req.body;

    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: priceId || "price_1Q1U3kAUZiS59tgnCLrglvkm",
          quantity: 1,
        },
      ],
      mode: "subscription",
      customer: customerId, // substituir pelo ID da conta do usuário logado
      success_url: `${baseURL}/administracao/usuarios?success=true`,
      cancel_url: `${baseURL}/administracao/usuarios?canceled=true`,
    });
  
    if (!session.url) {
      return res.status(400).json({
        error: "Erro ao criar checkout de assinatura.",
      });
    }
  
    return res.json(session.url);
  } catch (error: any) {
    return res.status(500).json({ message: `Erro ao criar checkout de assinatura.`, error: error.raw.message });
  }
};
