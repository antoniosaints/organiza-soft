import { Request, Response, NextFunction } from "express";
import JwtService from "../services/jwt_service";
import ResponseService from "../services/response_service";

const AUTH_ERRORS = {
  MISSING_TOKEN: "Token não informado",
  MALFORMED_TOKEN: "Token mal formatado",
  INVALID_TOKEN: "Token inválido",
  MISSING_ACCOUNT_ID: "A sessão não contém uma contaId",
};

const authMiddleware = (req: Request,res: Response, next: NextFunction): Response | void => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return ResponseService.unauthorized(res, AUTH_ERRORS.MISSING_TOKEN);
  }

  const [scheme, token] = authHeader.split(" ");

  if (!token || !/^Bearer$/i.test(scheme)) {
    return ResponseService.unauthorized(res, AUTH_ERRORS.MALFORMED_TOKEN);
  }

  try {
    JwtService.verify(token);
  } catch (err) {
    return ResponseService.unauthorized(res, AUTH_ERRORS.INVALID_TOKEN);
  }

  const decodedToken = JwtService.decode(token);
  const decodedRefreshToken = JwtService.decode(decodedToken.refreshToken);

  if (!decodedRefreshToken.contaId) {
    return ResponseService.unauthorized(res, AUTH_ERRORS.MISSING_ACCOUNT_ID);
  }

  req.body.userAccountId = decodedRefreshToken.contaId;

  next();
};

export default authMiddleware;
