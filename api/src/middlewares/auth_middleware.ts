import { Request, Response } from "express";
import JwtService from "../services/jwt_service";
import ResponseService from "../services/response_service";

const auth_middleware = (req: Request, res: Response, next: any) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return ResponseService.unauthorized(res, "Token não informado");
    }

    const parts = authHeader.split(" ");
    if (parts.length !== 2) {
        return ResponseService.unauthorized(res, "Token mal formatado");
    }

    const [scheme, token] = parts;

    if (!/^Bearer$/i.test(scheme)) {
        return ResponseService.unauthorized(res, "Token mal formatado");
    }

    try {
        JwtService.verify(token);
    } catch (err) {
        return ResponseService.unauthorized(res, "Token invalido");
    }

    const decodeToken = JwtService.decode(token);
    const decodeRefreshToken = JwtService.decode(decodeToken.refreshToken);

    if (!decodeRefreshToken.contaId) {
        return ResponseService.unauthorized(res, "A Sessão não contem uma contaId");
    }

    req.body.userAccountId = decodeRefreshToken.contaId;

    next();
};

export default auth_middleware;