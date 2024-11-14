import { ScToastUtil } from "@/utils/scToastUtil";
import StorageUtil from "@/utils/storageUtil";
import axiosService from "./axiosService";
import { Router } from "@/routes/Router";

export const handleTokenRefresh = async (errorConfig: any) => {
  try {
    const refreshToken = StorageUtil.get("@gestao_inteligente:refreshtoken");
    if (!refreshToken) {
      ScToastUtil.error("Erro ao tentar revalidar o token");
      return Promise.reject(new Error("No refresh token"));
    }

    const { data: newTokenResponse } = await axiosService.post(
      "/auth/refresh",
      { refreshToken }
    );
    const newToken = newTokenResponse?.token;

    if (newToken) {
      StorageUtil.set("@gestao_inteligente:token", newToken);
      axiosService.defaults.headers.Authorization = `Bearer ${newToken}`;
      errorConfig.headers.Authorization = `Bearer ${newToken}`;
      return axiosService(errorConfig);
    }
  } catch (error) {
    ScToastUtil.error("Sessão expirada, realize o login novamente");
    Router.push("/login");
    return Promise.reject(error);
  }
};
