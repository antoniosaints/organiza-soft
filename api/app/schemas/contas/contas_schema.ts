import zodUtil from "../../utils/validations/zod_util";

const createContaSistemaSchema = zodUtil.object({
  nome: zodUtil.string({
    invalid_type_error: "O nome deve ser uma string",
    required_error: "O nome é obrigatório",
  }),
  email: zodUtil
    .string({
      invalid_type_error: "O email deve ser uma string",
      required_error: "O email é obrigatório",
    }).email({
      message: "O email deve ser um email valido",
    }),
  descricao: zodUtil
    .string({
      invalid_type_error: "A descrição deve ser uma string",
    })
    .optional(),
  telefone: zodUtil
    .string({
      invalid_type_error: "O telefone deve ser uma string",
    })
    .optional(),
  senha: zodUtil
    .string({
      required_error: "A senha é obrigatória",
      invalid_type_error: "A senha deve ser uma string",
    })
    .min(8, {
      message: "A senha deve ter pelo menos 8 caracteres",
    })
    .regex(/^(?=.*[a-z])/, {
      message: "A senha deve conter pelo menos uma letra minúscula",
    })
    .regex(/^(?=.*[A-Z])/, {
      message: "A senha deve conter pelo menos uma letra maiúscula",
    })
    .regex(/^(?=.*\d)/, {
      message: "A senha deve conter pelo menos um número",
    })
    .regex(/^(?=.*[@$!%*?&])/, {
      message: "A senha deve conter pelo menos um caractere especial",
    })
    .trim(),
});

export { createContaSistemaSchema };
