import CookieUtil from "@/utils/cookie";
import axios from "axios";

const HttpAxios = axios.create({
    baseURL: "http://localhost:5000/",
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${CookieUtil.getCookie("@gestao_inteligente:token") || ""}`,
    },
    transformResponse: [function (data) {
        try {
            return JSON.parse(data).data;
        } catch (e) {
            return data;
        }
    }],
})

export default HttpAxios;