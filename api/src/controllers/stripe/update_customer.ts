import { Request, Response } from "express";
import prismaService from "../../services/prisma_service";
import { stripe } from "../../libs/stripe";
import ResponseService from "../../services/response_service";

export const updateCustomer = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, email, descricao, slug } = req.body;
    const account = await prismaService.contasSistema.findFirst({ where: { id: Number(id) } });
    if (!account) return res.status(400).send({ message: "Conta não encontrada" });
    if (account.status !== "ativa") return res.status(400).send({ message: "Conta não ativa, entre em contato com o suporte!" });

    await prismaService.contasSistema.update({
      where: { id: account.id },
      data: { email, conta: name, slug, descricao },
    });

    await stripe.customers.update(account.stripeCustomerId, { email, name, description: descricao });

    return ResponseService.success(res, { message: "Conta atualizada com sucesso" });
  } catch (error: any) {
    return res.status(500).send({ message: "Erro ao atualizar as informações", error });
  }
};
