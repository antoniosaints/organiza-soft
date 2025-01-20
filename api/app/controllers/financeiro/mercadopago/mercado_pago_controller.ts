import { Request, Response } from "express";
import { prismaService } from "../../../services";

export async function MPSaveCredentials(req: Request, res: Response) {
  try {
    const { apiKey, apiSecret, descricao } = req.body;
    const gateway = await prismaService.integracoesGateways.findFirst({
      where: {
        contaSistemaId: req.body.contaSistemaId,
        gatewayName: "mercadopago",
      },
    });

    if (!gateway) {
      await prismaService.integracoesGateways.create({
        data: {
          contaSistemaId: req.body.contaSistemaId,
          gatewayName: "mercadopago",
          apiKey,
          descricao,
          apiSecret,
        },
      });
    } else {
      await prismaService.integracoesGateways.update({
        where: {
          id: gateway.id,
          contaSistemaId: req.body.contaSistemaId,
          gatewayName: "mercadopago",
        },
        data: {
          apiKey,
          apiSecret,
          descricao
        },
      });
    }

    res.json({ message: "Credenciais salvas com sucesso" });
  } catch (error: any) {
    res.status(500).send(error.message);
  }
}

export async function MPGetCredentials(req: Request, res: Response) {
  try {
    const gateway = await prismaService.integracoesGateways.findFirst({
      where: {
        contaSistemaId: req.body.contaSistemaId,
        gatewayName: "mercadopago",
      },
    });
    res.json(gateway);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
}