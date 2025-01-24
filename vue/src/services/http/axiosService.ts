import axios from "axios";
import StorageUtil from "@/utils/storageUtil";
import { ScToastUtil } from "@/utils/scToastUtil";
import { useLoadingStore } from "@/composables/useLoading";

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

function getAuthTokens() {
  return {
    token: StorageUtil.get("@gestao_inteligente:token"),
    refreshToken: StorageUtil.get("@gestao_inteligente:refreshtoken"),
    contaId: StorageUtil.get("@gestao_inteligente:contaId"),
  };
}

axiosService.interceptors.request.use((config) => {
  const tokens = getAuthTokens();
  if (tokens.token) {
    config.headers.Authorization = `Bearer ${tokens.token}`;
    config.headers.AccountId = tokens.contaId;
  }
  const loadingStore = useLoadingStore();
  loadingStore.startLoading();
  return config;
});

axiosService.interceptors.response.use(
  (response) => {
    const loadingStore = useLoadingStore();
    loadingStore.stopLoading();
    return response;
  },
  async (error) => {
    const loadingStore = useLoadingStore();
    loadingStore.stopLoading();
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const tokens = getAuthTokens();
        const refreshResponse = await axiosService.post(`/auth/refresh`, {
          refreshToken: tokens.refreshToken,
        });

        const { token } = refreshResponse.data;
        StorageUtil.set("@gestao_inteligente:token", token);
        console.log("Novo token:", token);
        originalRequest.headers.Authorization = `Bearer ${token}`;
        return axiosService(originalRequest);
      } catch (refreshError) {
        console.error("Erro ao renovar token:", refreshError);
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosService;
