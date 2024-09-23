import { Request, Response } from "express";
import prismaService from "../../services/prisma_service";
import { stripe } from "../../libs/stripe";
import ResponseService from "../../services/response_service";

export const updateCustomer = async (request: Request, response: Response) => {
  try {
    const { id } = request.params;
    const { conta, email, descricao, slug } = request.body;
    const account = await prismaService.contasSistema.findFirst({ where: { id: Number(id) } });
    if (!account) return response.status(400).send({ message: "Conta não encontrada" });
    if (account.status !== "ativa") return response.status(400).send({ message: "Conta não ativa, entre em contato com o suporte!" });

    await prismaService.contasSistema.update({
      where: { id: account.id },
      data: { email, conta, slug, descricao },
    });

    await stripe.customers.update(account.stripeCustomerId, { email, name: conta, description: descricao });

    return ResponseService.success(response, { message: "Conta atualizada com sucesso" });
  } catch (error: any) {
    return response.status(500).send({ message: "Erro ao atualizar as informações", error });
  }
};
