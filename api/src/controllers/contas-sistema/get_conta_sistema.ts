import { Request, Response } from "express";
import prismaService from "../../services/prisma_service";

export const getContaSistema = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const account = await prismaService.contasSistema.findFirst({
      where: { id: Number(id) },
    });
    res.json(account);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
};
