import axios from "axios";
import StorageUtil from "@/utils/storageUtil";
import { ScToastUtil } from "@/utils/scToastUtil";
import { useLoadingStore } from "@/composables/useLoading";
import { handleTokenRefresh } from "./handleRefreshToken";

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
  const loadingStore = useLoadingStore();
  loadingStore.startLoading();
  return config;
});

axiosService.interceptors.response.use(
  response => {
    const loadingStore = useLoadingStore();
    loadingStore.stopLoading();
    return response;
  },
  async (error) => {
    const loadingStore = useLoadingStore();
    loadingStore.stopLoading();

    const responseData = error.response?.data;
    const tokenExpired = error.response?.status === 401 && responseData?.message === "Token invalido";

    if (tokenExpired) {
      return handleTokenRefresh(error.config);
    }

    return Promise.reject(error);
  }
);

export default axiosService;
