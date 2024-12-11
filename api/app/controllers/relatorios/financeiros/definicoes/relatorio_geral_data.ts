import { Request } from "express";
import { prismaService } from "../../../../services";
import { ContasSistema } from "@prisma/client";

export const getdataConta = async (req: Request): Promise<ContasSistema | null> => {
    if (req.body.contaSistemaId) {
        const conta = await prismaService.contasSistema.findFirst({
            where: {
                id: req.body.contaSistemaId
            }
        });
        if (conta) {
            return conta;
        }
        return null;
    };
    return null;
}