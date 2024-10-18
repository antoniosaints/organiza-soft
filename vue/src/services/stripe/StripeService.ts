import { ContasRepository } from "@/repositories/stripe/contasRepository";
import axiosService from "../http/axiosService";
import { ScToastUtil } from "@/utils/scToastUtil";

export const createCheckoutSession = async (customerId: string) => {
  try {
    if (!customerId) {
      ScToastUtil.error("Erro ao criar checkout de assinatura");
    }
    const session = await axiosService.post("stripe/create-checkout-session", {
      customerId,
    });
    return session;
  } catch (error) {
    console.log(error);
    ScToastUtil.error("Erro ao criar checkout de assinatura");
  }
};
export const createPortalCaptive = async (customerId: string) => {
  try {
    if (!customerId) {
      ScToastUtil.error("Erro ao criar o portal do assinante");
    }
    const session: any = await axiosService.post(
      "stripe/create-customer-portal",
      {
        customerId,
      }
    );
    return session;
  } catch (error) {
    console.log(error);
    ScToastUtil.error("Erro ao criar o portal do assinante");
  }
};

export const createCustomerStripe = async (
  nome: string,
  email: string,
  senha: string,
  descricao: string = "",
  telefone: string = ""
) => {
  try {
    const customer = await ContasRepository.createAccount(
      nome,
      email,
      senha,
      descricao,
      telefone
    );
    return customer;
  } catch (error: any) {
    console.log(error);
    ScToastUtil.error("Ocorreu um erro ao criar sua conta! " + error.response.data.message || "erro interno");
  }
};
