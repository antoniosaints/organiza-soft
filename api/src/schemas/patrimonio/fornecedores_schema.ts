import zodUtil from "../../utils/validations/zod_util";

const createFornecedorSchema = zodUtil.object({
  nome: zodUtil.string({
    required_error: "O campo nome é obrigatorio",
    invalid_type_error: "O nome deve ser uma string",
  }),
  cpf_cnpj: zodUtil.string({
    required_error: "O campo cpf_cnpj é obrigatorio",
    invalid_type_error: "O campo cpf_cnpj deve ser uma string",
  }).regex(/^[0-9]+$/, "O campo cpf_cnpj deve conter apenas números"),
  contato: zodUtil.string({
    required_error: "A campo contato é obrigatorio",
    invalid_type_error: "A campo contato deve ser uma string",
  }),
  contaSistemaId: zodUtil.number({
    required_error: "O contaSistemaId é obrigatorio",
    invalid_type_error: "O contaSistemaId deve ser um number",
  }),
  email: zodUtil.string({
    required_error: "O campo email é obrigatorio",
    invalid_type_error: "O campo email deve ser uma string",
  }).email("O email deve ser um email valido"),
  descricao: zodUtil.string({
    required_error: "O campo descricao é obrigatorio",
    invalid_type_error: "O campo descricao deve ser um number",
  }),
});

const updateFornecedorSchema = zodUtil.object({
  nome: zodUtil
    .string({
      invalid_type_error: "O campo nome deve ser uma string",
    })
    .optional(),
  cpf_cnpj: zodUtil
    .string({
      invalid_type_error: "O campo cpf_cnpj deve ser uma string",
    })
    .regex(/^[0-9]+$/, "O campo cpf_cnpj deve conter apenas números")
    .optional(),
  contato: zodUtil
    .string({
      invalid_type_error: "O campo contato deve ser uma string",
    })
    .optional(),
  contaSistemaId: zodUtil
    .number({
      invalid_type_error: "O contaSistemaId deve ser um number",
    })
    .optional(),
  email: zodUtil
    .string({
      invalid_type_error: "O campo email deve ser uma string",
    })
    .email("O email deve ser um email valido")
    .optional(),
  descricao: zodUtil
    .string({
      invalid_type_error: "O campo descricao deve ser uma string",
    })
    .optional(),
});

export { createFornecedorSchema, updateFornecedorSchema };
