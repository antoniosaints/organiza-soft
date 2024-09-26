import { useColorMode } from "@vueuse/core";
import {
  ChatCompletionMessage,
  ChatCompletionMessageParam,
  ChatCompletionTool,
} from "openai/resources/index.mjs";

export const changeColorModeTool: ChatCompletionTool = {
  type: "function",
  function: {
    name: "changeColorMode",
    description:
      "Questiona sobre qual tema o usuário quer usar no sistema, entre claro e escuro",
    parameters: {
      type: "object",
      properties: {
        tema: {
          type: "string",
          description: "Deve ser light or dark",
        },
      }, 
      required: ["tema"],
      additionalProperties: false,
    },
  },
};

export const changeColorMode = async (response: ChatCompletionMessage): Promise<ChatCompletionMessageParam> => {
  try {
    if (response.tool_calls) {
      const colormode = useColorMode();
        const function_arguments = JSON.parse(response.tool_calls[0].function.arguments);
        if (function_arguments.tema == "dark") {
          colormode.value = "dark";
          return {
            role: "assistant",
            content: `Tema alterado para o modo escuro`,
          };
        }else {
          colormode.value = "light";
          return {
            role: "assistant",
            content: `Tema alterado para o modo claro`,
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
      content: `Não consegui alterar o tema, poderia me enviar novamente?`,
    };
  }
};
