import { UsuariosRepository } from "@/repositories/administracao/usuarios/usuariosRepository";
import { ScToastUtil } from "@/utils/scToastUtil";
import {
  ChatCompletionMessage,
  ChatCompletionMessageParam,
  ChatCompletionTool,
} from "openai/resources/index.mjs";

export const createUsuarioAITool: ChatCompletionTool = {
  type: "function",
  function: {
    name: "createUsuarioAI",
    strict: true,
    description:
      "Responsável por criar novos usuários no sistema com base nos dados coletados do usuário",
    parameters: {
      type: "object",
      properties: {
        nome: {
          type: "string",
          description: "Nome do novo usuário",
        },
        email: {
          type: "string",
          description: "Deve ser um email válido, exemplo: 0L0wE@example.com",
        },
        senha: {
          type: "string",
          description: "Deve ser uma senha segura com pelo menos 8 caracteres",
        },
        confirmacao: {
          type: "string",
          description:
            "Confirmação se pode lançar essa venda no sistema, deve ser questionada toda vez antes de realizar a persistência",
        },
      },
      required: ["nome", "email", "senha", "confirmacao"],
      additionalProperties: false,
    },
  },
};

export const createUsuarioAI = async (
  response: ChatCompletionMessage
): Promise<ChatCompletionMessageParam> => {
  try {
    if (response.tool_calls) {
      const function_arguments = JSON.parse(
        response.tool_calls[0].function.arguments
      );
      const res = await UsuariosRepository.create({
        email: function_arguments.email,
        nome: function_arguments.nome,
        senha: function_arguments.senha,
        regra: "visualizador",
        status: "ativo",
      });
      if (res) {
        ScToastUtil.success(
          `Usuario ${function_arguments.nome} criado com sucesso!`
        );
        return {
          role: "assistant",
          content: `Usuario ${function_arguments.nome} criado com sucesso!`,
        };
      } else {
        return {
          role: "assistant",
          content: "Ocorreu um erro ao criar o usuário, tente novamente",
        };
      }
    } else {
      return {
        role: "assistant",
        content: `Poderia enviar novamente?`,
      };
    }
  } catch (error) {
    return {
      role: "assistant",
      content: `Não consegui salvar o usuário, poderia me enviar novamente?`,
    };
  }
};
