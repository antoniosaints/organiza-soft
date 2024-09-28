import { Request, Response } from "express";
import { prismaService, StripeService } from "../../services";

export const createCustomerStripe = async (req: Request, res: Response) => {
  const { name, email } = req.body;
  try {
    const getContaByEmail = await prismaService.contasSistema.findFirst({
      where: {
        email: email,
      },
    });

    let contaSistema;
    let customer;

    if (getContaByEmail) {
      return res.status(400).json({ message: "Já existe uma conta com esse e-mail" });
    } else {
      customer = await StripeService.createCustomer(email, name);
      contaSistema = await prismaService.contasSistema.create({
        data: {
          email: email,
          conta: name,
          stripeCustomerId: customer.id,
        }
      })
    }

    return res.status(200).json({ customer, contaSistema });
  } catch (error: any) {
    return res.status(500).json({ error });
  }
};
