import toastUtil from "@/utils/toastUtil";
import OpenAI from "openai";

const APITOKEN = import.meta.env.VITE_OPENAI_API_KEY

if (!APITOKEN) {
    toastUtil.error("VITE_BASE_URL_BACKEND não informada nas variáveis de ambiente", "Ops..");
}

const OpenAIService = new OpenAI({
    apiKey: APITOKEN,
    dangerouslyAllowBrowser: true
});

export { OpenAIService }