import { Request, Response } from "express";
import prismaService from "../../services/prisma_service";
import { stripe } from "../../libs/stripe";
import ResponseService from "../../services/response_service";

export const reactiveAccountStripe = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const account = await prismaService.contasSistema.findFirst({ where: { id: Number(id), status: "inativa" } });
    if (!account) return res.status(400).send({ message: "Conta não encontrada ou já está ativa" });
    
    const customerNew = await stripe.customers.create({
      email: account.email,
      name: account.conta,
    })

    await prismaService.contasSistema.update({
      where: { id: account.id },
      data: { stripeCustomerId: customerNew.id, status: "ativa" },
    });

    return ResponseService.success(res, { message: "Conta reativada com sucesso" });
  } catch (error: any) {
    return res.status(500).send({ message: "Erro ao atualizar as informações", error });
  }
};
