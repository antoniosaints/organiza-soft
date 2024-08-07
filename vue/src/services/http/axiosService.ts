import axios from "axios";
import StorageUtil from "../../utils/storageUtil";

const axiosService = axios.create({
    baseURL: "http://localhost:5000",
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