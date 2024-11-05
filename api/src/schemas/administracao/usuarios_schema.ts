import zodUtil from "../../utils/validations/zod_util";

const createUser = zodUtil.object({
  nome: zodUtil.string({
    required_error: "O nome é obrigatório",
    invalid_type_error: "O nome deve ser uma string",
  }),
  email: zodUtil
    .string({
      required_error: "O email é obrigatório",
      invalid_type_error: "O email deve ser uma string",
    })
    .email({
      message: "O email deve ser um email válido",
    })
    .toLowerCase()
    .trim(),
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
  telefone: zodUtil
    .string({
      invalid_type_error: "O telefone deve ser uma string",
    })
    .optional(),
  regra: zodUtil.enum(
    [
      "proprietario",
      "socio",
      "admin",
      "gerente",
      "moderador",
      "submoderador",
      "visualizador",
    ],
    {
      invalid_type_error:
        "A regra deve ser uma das sequintes admin, gerente, moderador, submoderador, visualizador",
      required_error: "A regra e obrigatória",
    }
  ),
  status: zodUtil.enum(["ativo", "inativo"]).optional(),
  contaSistemaId: zodUtil.number({
    required_error: "O contaSistemaId é obrigatório",
    invalid_type_error: "O contaSistemaId deve ser um number",
  }),
});

const updateUser = zodUtil.object({
  nome: zodUtil
    .string({
      invalid_type_error: "O nome deve ser uma string",
    })
    .optional(),
  email: zodUtil
    .string({
      invalid_type_error: "O email deve ser uma string",
    })
    .email({
      message: "O email deve ser um email válido",
    })
    .toLowerCase()
    .trim()
    .optional(),
  senha: zodUtil
    .string({
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
    .regex(/^(?=.*[@$!%*?&.#])/, {
      message: "A senha deve conter pelo menos um caractere especial (@$!%*?&.#)",
    })
    .trim()
    .optional(),
  telefone: zodUtil
    .string({
      invalid_type_error: "O telefone deve ser uma string",
    })
    .optional(),
  regra: zodUtil
    .enum([
      "proprietario",
      "socio",
      "admin",
      "gerente",
      "moderador",
      "submoderador",
      "visualizador",
    ])
    .optional(),
  status: zodUtil.enum(["ativo", "inativo"]).optional(),
});

export { createUser, updateUser };
