import { Request, Response } from "express";
import { prismaService } from "../../services";

export const getContasSistema = async (req: Request, res: Response) => {
    try {
        const account = await prismaService.contasSistema.findMany();
        res.json(account);
    } catch (error: any) {
        res.status(500).send(error.message);
    }
}