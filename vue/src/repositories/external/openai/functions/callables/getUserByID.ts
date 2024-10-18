import { Autorize } from "@/autorization";
import { UsuariosRepository } from "@/repositories/administracao/usuarios/usuariosRepository";
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
      "Retorna informações sobre um usuário do sistema coletando o id do mesmo, essa função tem a única função de buscar o usuário no backend e retornar para o usuário",
    parameters: {
      type: "object",
      properties: {
        userId: {
          type: "string",
          description: "O ID do usuário a ser pesquisado, precisa ser informado pois com ele vamos buscar o usuário no banco",
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
        if (!Autorize.can("detalhar", "usuarios")) return {
          role: "assistant",
          content: "Não tens permissão para realizar esta ação, tente novamente mais tarde",
        };
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
