import CookieUtil from "@/utils/cookie";


// const BASE_URL = "http://localhost:8443/";
const BASE_URL = "http://localhost:5000/";

async function httpService(path, method = "GET", body = null) {
  const url = `${BASE_URL}${path}`;

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${CookieUtil.getCookie("@gestao_inteligente:token")}`,
  };

  const options = {
    method,
    headers,
    body: body ? JSON.stringify(body) : null,
  };

  const response = await fetch(url, options);
  if (!response.ok) {
    const errorMessage = await response.json();
    throw new Error(errorMessage.message);
  }
  const contentType = response.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    return await response.json();
  } else {
    console.log(response)
    throw new Error("Resposta do servidor não é um JSON válido");
  }

}

export default httpService;
