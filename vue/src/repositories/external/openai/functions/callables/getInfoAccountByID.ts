import { ContasRepository } from "@/repositories/contas/contasRepository";
import {
  ChatCompletionMessage,
  ChatCompletionMessageParam,
  ChatCompletionTool,
} from "openai/resources/index.mjs";

export const getIdAccountTool: ChatCompletionTool = {
  type: "function",
  function: {
    name: "getInfosAccountByID",
    description:
      "Retorna informações sobre uma conta do sistema, sempre precisa receber um ID.",
    parameters: {
      type: "object",
      properties: {
        accountID: {
          type: "string",
          description: "O ID da conta a ser pesquisado.",
        },
      },
      required: ["accountID"],
      additionalProperties: false,
    },
  },
};

export const getInfosAccountByID = async (response: ChatCompletionMessage): Promise<ChatCompletionMessageParam> => {
  try {
    if (response.tool_calls) {
        const function_arguments = JSON.parse(response.tool_calls[0].function.arguments);
        const res = await ContasRepository.get(Number(function_arguments.accountID));
        if (res) {
          return {
            role: "system",
            content: `Retorne esses dados para o usuário em formato legível, ${JSON.stringify(res)}`,
          };
        }else {
          return {
            role: "assistant",
            content: `Não encontrei nenhuma conta com esse ID, poderia me enviar novamente?`,
          };
        }
    }else {
      return {
        role: "assistant",
        content: `Poderia enviar novamente?`,
      };
    }
  } catch (error) {
    return {
      role: "assistant",
      content: `Não consegui encontrar nenhuma conta com esse ID, poderia me enviar novamente?`,
    };
  }
};
