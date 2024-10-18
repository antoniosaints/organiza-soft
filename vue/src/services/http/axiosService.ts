import axios from "axios";
import StorageUtil from "@/utils/storageUtil";
import { ScToastUtil } from "@/utils/scToastUtil";
import { Router } from "@/routes/Router";

const BASEURL = import.meta.env.VITE_BASE_URL_BACKEND;

if (!BASEURL) {
  ScToastUtil.error(
    "VITE_BASE_URL_BACKEND não informada nas variáveis de ambiente"
  );
}

const axiosService = axios.create({
  baseURL: BASEURL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosService.interceptors.request.use((config) => {
  const token = StorageUtil.get("@gestao_inteligente:token");
  const contaId = StorageUtil.get("@gestao_inteligente:contaId");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    config.headers.AccountId = contaId;
  }
  return config;
});

axiosService.interceptors.response.use(
  (response) => response,
  async (err: any) => {
    const responseData = err.response?.data as any;
    const tokenExpired =
      err.response?.status === 401 &&
      responseData?.message === "Token invalido";

    if (tokenExpired) {
      try {
        StorageUtil.remove("@gestao_inteligente:token");
        const refreshToken = StorageUtil.get(
          "@gestao_inteligente:refreshtoken"
        );
        if (!refreshToken) {
          ScToastUtil.error("Erro ao tentar revalidar o token");
          return Promise.reject(err);
        }

        const { data: newTokenResponse } = await axiosService.post(
          "/auth/refresh",
          { refreshToken }
        );

        if (newTokenResponse?.token) {
          StorageUtil.set("@gestao_inteligente:token", newTokenResponse.token);
          axiosService.defaults.headers.Authorization = `Bearer ${newTokenResponse.token}`;
          err.config.headers.Authorization = `Bearer ${newTokenResponse.token}`;
        }
        return axiosService(err.config);
      } catch (error) {
        ScToastUtil.error("Sessão expirada, realize o login novamente");
        Router.push("/login");
        return Promise.reject(error);
      }
    }
    return Promise.reject(err);
  }
);

export default axiosService;
