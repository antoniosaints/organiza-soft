import zodUtil from "../../utils/validations/zod_util";
const createPlano = zodUtil.object({
  nome: zodUtil.string({
    required_error: "O nome é obrigatório",
    invalid_type_error: "O nome deve ser uma string",
  }),
  descricao: zodUtil
    .string({
      invalid_type_error: "A descricao deve ser uma string",
    })
    .optional(),
  preco: zodUtil.number({
    required_error: "O preco é obrigatório",
    invalid_type_error: "O preco deve ser um number",
  }),
  cor: zodUtil.string({
    required_error: "A cor é obrigatória",
    invalid_type_error: "A cor deve ser uma string",
  }),
  contaSistemaId: zodUtil.number({
    required_error: "O contaSistemaId é obrigatorio",
    invalid_type_error: "O contaSistemaId deve ser um number",
  }),
});

const updatePlano = zodUtil.object({
  nome: zodUtil
    .string({
      invalid_type_error: "O nome deve ser uma string",
    })
    .optional(),
  descricao: zodUtil
    .string({
      invalid_type_error: "A descricao deve ser uma string",
    })
    .optional(),
  preco: zodUtil
    .number({
      invalid_type_error: "O preco deve ser um number",
    })
    .optional(),
  cor: zodUtil
    .string({
      invalid_type_error: "A cor deve ser uma string",
    })
    .optional(),
  contaSistemaId: zodUtil
    .number({
      invalid_type_error: "O contaSistemaId deve ser um number",
    })
    .optional(),
});

export { createPlano, updatePlano };
