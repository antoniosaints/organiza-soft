import JwtService from "../services/jwt_service";
import ResponseService from "../services/response_service";

const auth_middleware = (req: any, res: any, next: any) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return ResponseService.unauthorized(res, "unauthorized", "Token não informado");
    }

    const parts = authHeader.split(" ");
    if (parts.length !== 2) {
        return ResponseService.unauthorized(res, "unauthorized", "Token mal formatado");
    }

    const [scheme, token] = parts;

    if (!/^Bearer$/i.test(scheme)) {
        return ResponseService.unauthorized(res, "unauthorized", "Token mal formatado");
    }

    try {
        JwtService.verify(token);
    }catch (err) {
        return ResponseService.unauthorized(res, "unauthorized", "Token inválido");
    }

    next();
};

export default auth_middleware;