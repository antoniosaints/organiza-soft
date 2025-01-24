import { Usuario } from "@prisma/client";
import JwtService from "./jwt_service";
import env from "../../configs/env";

export const tokenGenerator = (user: Usuario) => {
  const payload = {
    userId: user.id,
    name: user.nome,
    contaId: user.contaSistemaId,
  };

  const refreshToken = JwtService.encode(payload, env.LIFETIMEREFRESHTOKEN);
  const token = JwtService.encode({ refreshToken }, env.LIFETIMETOKEN);

  return { token, refreshToken, contaId: user.contaSistemaId };
};

export const tokenRefresh = (refreshToken: string) => {
  const token = JwtService.encode({ refreshToken }, env.LIFETIMETOKEN);
  return { token };
};