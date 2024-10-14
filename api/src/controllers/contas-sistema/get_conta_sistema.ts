import { Request, Response } from "express";
import { HttpErrorService, prismaService } from "../../services";

export const getContaSistema = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const account = await prismaService.contasSistema.findFirst({
      where: { id: Number(id) },
    });
    res.json(account);
  } catch (error: any) {
    HttpErrorService.hadle(error, res);
  }
};
