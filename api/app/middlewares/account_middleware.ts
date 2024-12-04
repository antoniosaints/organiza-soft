import { Request, Response } from "express";
import ResponseService from "../services/http/response_service";
import prismaService from "../services/database/prisma_service";

// Middleware para validação de accountId, se existir, adiciona ao body do request
const accountMiddleware = async (req: Request, res: Response, next: any) => {
    const accountId = req.headers["accountid"];
    if (!accountId) return ResponseService.unauthorized(res, "Você deve enviar o AccountId nos headers da requisição!");

    const accountUser = await prismaService.contasSistema.findFirst({ where: { id: Number(accountId)}});

    if (!accountUser) return ResponseService.unauthorized(res, "A Conta não foi encontrada no sistema!");

    if (req.body.userAccountId && req.body.userAccountId !== Number(accountId)) {
        return ResponseService.unauthorized(res, "Operação não permitida devido à conflitos de conta e sessão!");
    } 

    req.body.contaSistemaId = accountUser.id;

    next();
};

export default accountMiddleware;