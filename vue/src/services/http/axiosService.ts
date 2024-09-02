import axios from "axios";
import StorageUtil from "@/utils/storageUtil";
import toastUtil from "@/utils/toastUtil";

const BASEURL = import.meta.env.VITE_BASE_URL_BACKEND

if (!BASEURL) {
    toastUtil.error("VITE_BASE_URL_BACKEND não informada nas variáveis de ambiente", "Ops..");
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
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default axiosService