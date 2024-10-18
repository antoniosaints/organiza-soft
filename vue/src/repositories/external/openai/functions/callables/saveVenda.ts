import {
  ChatCompletionMessage,
  ChatCompletionMessageParam,
  ChatCompletionTool,
} from "openai/resources/index.mjs";

export const saveVendaIntoDatabaseTool: ChatCompletionTool = {
  type: "function",
  function: {
    name: "saveVendaIntoDatabase",
    strict: true,
    description:
      "Recebe os dados necssários para cadastrar uma venda no sistema, o usuário deve preencher as informações pois precisamos dessas para realizar a persistência",
    parameters: {
      type: "object",
      properties: {
        clienteId: {
          type: "string",
          description: "O Id do cliente no sistema.",
        },
        preco: {
          type: "string",
          description: "O valor da venda, é um campo obrigatório",
        },
        quantidade: {
          type: "string",
          description: "Total de itens vendidos",
        },
        confirmacao: {
          type: "string",
          description: "Confirmação se pode lançar essa venda no sistema, deve ser questionada toda vez antes de realizar a persistência",
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
