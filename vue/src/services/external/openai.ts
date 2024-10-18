import { ScToastUtil } from "@/utils/scToastUtil";
import OpenAI from "openai";

const APITOKEN = import.meta.env.VITE_OPENAI_API_KEY

if (!APITOKEN) {
    ScToastUtil.error("VITE_OPENAI_API_KEY não informada nas variáveis de ambiente");
}

const OpenAIService = new OpenAI({
    apiKey: APITOKEN,
    dangerouslyAllowBrowser: true
});

export { OpenAIService }