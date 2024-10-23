import { Request, Response } from "express";
import { createAuth as createAuthSchema } from "../../schemas/administracao/auth_schema";
import {
  HttpErrorService,
  JwtService,
  prismaService,
  ResponseService,
  validateSchema,
} from "../../services";

class AuthController {
  static async login(req: Request, res: Response) {
    try {
      const { email, senha } = validateSchema(createAuthSchema, req.body);

      const user = await prismaService.usuario.findFirst({
        where: { email, senha },
      });

      if (!user)
        return ResponseService.notFound(res, "Usuário não encontrado!");

      const payload = {
        userId: user.id,
        name: user.nome,
        contaId: user.contaSistemaId,
      };

      const refreshToken = JwtService.encode(payload, "7d");
      const token = JwtService.encode({ refreshToken }, "8h");

      return ResponseService.success(
        res,
        { token, refreshToken, contaId: user.contaSistemaId },
        "Login realizado com sucesso"
      );
    } catch (error) {
      HttpErrorService.hadle(error, res);
    } finally {
      await prismaService.$disconnect();
    }
  }

  static async verify(req: Request, res: Response) {
    try {
      const token = req.headers.authorization?.split(" ")[1];

      if (!token) {
        return ResponseService.unauthorized(res, "Token não informado");
      }

      JwtService.verify(token);

      return ResponseService.success(
        res,
        { token },
        "Token verificado com sucesso"
      );
    } catch (err) {
      HttpErrorService.hadle(err, res);
    }
  }

  static async decode(req: Request, res: Response) {
    try {
      const authHeader = req.headers.authorization;

      if (!authHeader)
        return ResponseService.unauthorized(res, "Token não informado");

      const [scheme, token] = authHeader.split(" ");

      if (scheme !== "Bearer")
        return ResponseService.unauthorized(res, "Token mal formatado");
      const { refreshToken } = JwtService.decode(token);
      const data = JwtService.decode(refreshToken);

      return ResponseService.success(
        res,
        { data },
        "Token decodificado com sucesso"
      );
    } catch (error) {
      return HttpErrorService.hadle(error, res);
    }
  }

  static async refreshToken(req: Request, res: Response) {
    try {
      const { refreshToken } = req.body;

      if (!refreshToken) {
        return ResponseService.unauthorized(res, "Token não informado");
      }

      JwtService.verify(refreshToken);

      const token = JwtService.encode({ refreshToken }, "8h");
      return ResponseService.success(
        res,
        { token },
        "Token atualizado com sucesso"
      );
    } catch (error) {
      HttpErrorService.hadle(error, res);
    }
  }
}

export default AuthController;
