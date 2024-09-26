import { UsuariosRepository } from "@/repositories/usuarios/usuariosRepository";
import {
  ChatCompletionMessage,
  ChatCompletionMessageParam,
  ChatCompletionTool,
} from "openai/resources/index.mjs";

export const getUserByIDTool: ChatCompletionTool = {
  type: "function",
  function: {
    name: "getUserByID",
    description:
      "Retorna informações sobre um usuário do sistema coletando o id do mesmo, retorne os dados sempre formatado",
    parameters: {
      type: "object",
      properties: {
        userId: {
          type: "string",
          description: "O ID do usuário a ser pesquisado",
        },
      }, 
      required: ["userId"],
      additionalProperties: false,
    },
  },
};

export const getUserByID = async (response: ChatCompletionMessage): Promise<ChatCompletionMessageParam> => {
  try {
    if (response.tool_calls) {
        const function_arguments = JSON.parse(response.tool_calls[0].function.arguments);
        const res = await UsuariosRepository.get(Number(function_arguments.userId));
        if (res) {
          return {
            role: "system",
            content: `Retorne esses dados para o usuário formatados em texto, ${JSON.stringify(res)}`,
          };
        }else {
          return {
            role: "assistant",
            content: `Não encontrei nenhum usuário com esse ID, poderia me enviar novamente?`,
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
      content: `Não consegui encontrar nenhum usuário esse ID, poderia me enviar novamente?`,
    };
  }
};
