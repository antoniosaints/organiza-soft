import { Request, Response } from "express";
import { HttpErrorService, prismaService, StripeService, validateSchema } from "../../services";
import { createContaSistemaSchema } from "../../schemas/contas/contas_schema";

export const createCustomerStripe = async (req: Request, res: Response) => {
  try {
    const {email, descricao, nome, telefone, senha } = validateSchema(createContaSistemaSchema, req.body);
    const getContaByEmail = await prismaService.contasSistema.findFirst({
      where: {
        email: email,
      },
    });

    let contaSistema;
    let customer;
    let usuario;

    if (getContaByEmail) {
      return res.status(400).json({ message: "Já existe uma conta com esse e-mail" });
    } else {
      customer = await StripeService.createCustomer(email, nome, descricao, telefone);
      contaSistema = await prismaService.contasSistema.create({
        data: {
          email: email,
          conta: nome,
          slug: nome,
          descricao: descricao,
          stripeCustomerId: customer.id,
        }
      })
      usuario = await prismaService.usuario.findFirst({
        where: {
          contaSistemaId: contaSistema.id,
          email: email
        }
      })

      if (!usuario) {
        usuario = await prismaService.usuario.create({
          data: {
            contaSistemaId: contaSistema.id,
            email: email,
            nome: nome,
            regra: "socio",
            senha: senha,
            telefone: telefone,
            anotacoes: descricao
          }
        })
      }
    }

    return res.status(200).json({ message: "Conta criada com sucesso", data: { contaSistema, customer, usuario } });
  } catch (error: any) {
    HttpErrorService.hadle(error, res);
  }
};
