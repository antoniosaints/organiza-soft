import axios from "axios";
import StorageUtil from "@/utils/storageUtil";
import { ScToastUtil } from "@/utils/scToastUtil";

const BASEURL = import.meta.env.VITE_BASE_URL_BACKEND

if (!BASEURL) {
    ScToastUtil.error("VITE_BASE_URL_BACKEND não informada nas variáveis de ambiente");
}

const axiosService = axios.create({
    baseURL: BASEURL,
    timeout: 1000,
    headers: {
        "Content-Type": "application/json",
    }
});

axiosService.interceptors.request.use(config => {
    const token = StorageUtil.get("@gestao_inteligente:token");
    const contaId = StorageUtil.get("@gestao_inteligente:contaId");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
        config.headers.AccountId = contaId;
    }
    return config;
});

export default axiosService