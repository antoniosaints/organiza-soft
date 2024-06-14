import axios from "axios";
import CookieUtil from "@/utils/cookie";

// const BASE_URL = "http://localhost:8443/";
const BASE_URL = "http://localhost:5000/";

async function httpService(path, method = "GET", body = null) {
  const url = `${BASE_URL}${path}`;

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${CookieUtil.getCookie(
      "@gestao_inteligente:token"
    )}`,
  };

  try {
    const response = await axios({
      url,
      method,
      headers,
      data: body ? JSON.stringify(body) : null,
    });

    // Verificar se a resposta é um JSON válido
    if (response.headers["content-type"].includes("application/json")) {
      return response.data;
    } else {
      console.log(response);
      throw new Error("Resposta do servidor não é um JSON válido");
    }
  } catch (error) {
    // Lida com erros de resposta HTTP e outros erros de rede
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error("Erro ao conectar com o servidor");
    }
  }
}

export default httpService;
