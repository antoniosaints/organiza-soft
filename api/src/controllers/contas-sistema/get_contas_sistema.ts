import { Request, Response } from "express";
import { HttpErrorService, prismaService } from "../../services";

export const getContasSistema = async (req: Request, res: Response) => {
    try {
        const account = await prismaService.contasSistema.findMany();
        res.json(account);
    } catch (error: any) {
        HttpErrorService.hadle(error, res);
    }
}