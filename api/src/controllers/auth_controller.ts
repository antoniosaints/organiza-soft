import HttpErrorService from "../services/http_error_service";
import JwtService from "../services/jwt_service";
import prisma_service from "../services/prisma_service";
import ResponseService from "../services/response_service";

class AuthController {
    static async login(req: any, res: any) {
        const { email, password } = req.body;

        if (!email || !password) {
            return ResponseService.badRequest(res, "email and password are required");
        }

        const user = await prisma_service.usuario.findFirst({
            where: {
                email
            }
        });

        if (!user) {
            return ResponseService.notFound(res, "user not found");
        }

        if (user.senha !== password) {
            return ResponseService.unauthorized(res, "invalid credentials");
        }

        const refreshToken = JwtService.encode({ userId: user.id, name: user.nome }, "7d");
        const token = JwtService.encode({refreshToken}, "4h");
        return ResponseService.success(res, { token, refreshToken }, "Login realizado com sucesso");
    }

    static async verify(req: any, res: any) {
        try {
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

            JwtService.verify(token);
            ResponseService.success(res, { token }, "Token verificado com sucesso");
        }catch (err) {
            HttpErrorService.hadle(err, res);
        }
    }
}

export default AuthController;