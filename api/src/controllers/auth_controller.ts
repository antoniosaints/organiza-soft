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

        const token = JwtService.encode({ userId: user.id, name: user.nome }, "4h");
        return ResponseService.success(res, { token });
    }
}

export default AuthController;