import {
  ChatCompletionMessage,
  ChatCompletionMessageParam,
  ChatCompletionTool,
} from "openai/resources/index.mjs";

export const saveVendaIntoDatabaseTool: ChatCompletionTool = {
  type: "function",
  function: {
    name: "saveVendaIntoDatabase",
    description:
      "Recebe os dados necssários para cadastrar uma venda no sistema",
    parameters: {
      type: "object",
      properties: {
        clienteId: {
          type: "string",
          description: "O Id do cliente.",
        },
        preco: {
          type: "string",
          description: "O valor da venda",
        },
        quantidade: {
          type: "string",
          description: "Total de itens vendidos",
        },
        confirmacao: {
          type: "string",
          description: "Confirma os dados inseridos?",
        }
      },
      required: ["clienteId", "preco", "quantidade", "confirmacao"],
      additionalProperties: false,
    },
  },
};

export const saveVendaIntoDatabase = async (response: ChatCompletionMessage): Promise<ChatCompletionMessageParam> => {
  try {
    if (response.tool_calls) {
        const function_arguments = JSON.parse(response.tool_calls[0].function.arguments);
        return {
          role: "assistant",
          content: `Esses são os dados referente a venda ${JSON.stringify(function_arguments)},`,
        };
    }else {
      return {
        role: "assistant",
        content: `Poderia enviar novamente?`,
      };
    }
  } catch (error) {
    return {
      role: "assistant",
      content: `Não consegui coletar os dados, poderia me enviar novamente?`,
    };
  }
};
