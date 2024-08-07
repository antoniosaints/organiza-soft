import CookieUtil from "@/utils/cookie";
import axios from "axios";

if (!import.meta.env.VITE_BASE_URL_BACKEND) {
  throw new Error("BASE_URL não foi definida no arquivo de configuração");
}
const HttpAxios = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL_BACKEND,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${CookieUtil.getCookie("@gestao_inteligente:token") || ""
      }`,
  }
});

export default HttpAxios;
