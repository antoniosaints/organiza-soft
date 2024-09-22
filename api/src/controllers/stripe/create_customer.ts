import { Request, Response } from "express";
import { StripeService } from "../../services/stripe_service";
import prismaService from "../../services/prisma_service";
import { stripe } from "../../libs/stripe";

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
      customer = await stripe.customers.retrieve(
        getContaByEmail.stripeCustomerId
      );
      if (customer.deleted) {
        customer = await StripeService.createCustomer(email, name);
      } else {
        customer = await stripe.customers.update(
          getContaByEmail.stripeCustomerId,
          {email, name}
        );
      }
      contaSistema = await prismaService.contasSistema.update({
        where: {
          id: getContaByEmail.id,
        },
        data: { email, conta: name, stripeCustomerId: customer.id },
      });
    } else {
      customer = await StripeService.createCustomer(email, name);
      contaSistema = await prismaService.contasSistema.create({
        data: {
          conta: name,
          email,
          status: "ativa",
          stripeCustomerId: customer.id,
          user_create_id: 1,
        },
      });
    }

    return res.status(200).json({ customer, contaSistema });
  } catch (error: any) {
    return res.status(500).json({ error });
  }
};
