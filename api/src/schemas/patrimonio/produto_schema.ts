import zodUtil from "../../utils/validations/zod_util";

const createProdutoSchema = zodUtil.object({
  produto: zodUtil.string({
    required_error: "O nome do produto é obrigatorio",
    invalid_type_error: "O nome do produto deve ser uma string",
  }),
  cor: zodUtil.string({
    required_error: "A cor é obrigatorio",
    invalid_type_error: "A cor deve ser uma string",
  }),
  contaSistemaId: zodUtil.number({
    required_error: "O contaSistemaId é obrigatorio",
    invalid_type_error: "O contaSistemaId deve ser um number",
  }),
  categoriaId: zodUtil.number({
    required_error: "O categoriaId é obrigatorio",
    invalid_type_error: "O categoriaId deve ser um number",
  }),
  descricao: zodUtil.string({
    required_error: "A descrição é obrigatorio",
    invalid_type_error: "A descrição deve ser uma string",
  }),
  sku: zodUtil.string({
    required_error: "O SKU é obrigatorio",
    invalid_type_error: "O SKU deve ser uma string",
  }),
  preco: zodUtil.number({
    required_error: "O preco é obrigatorio",
    invalid_type_error: "O preco deve ser um número",
  }),
});

const updateProdutoSchema = zodUtil.object({
  produto: zodUtil
    .string({
      invalid_type_error: "O nome do produto deve ser uma string",
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
  categoriaId: zodUtil
    .number({
      invalid_type_error: "O categoriaId deve ser um number",
    })
    .optional(),
  descricao: zodUtil
    .string({
      invalid_type_error: "A descrição deve ser uma string",
    })
    .optional(),
  sku: zodUtil
    .string({
      invalid_type_error: "O SKU deve ser uma string",
    })
    .optional(),
  preco: zodUtil
    .number({
      invalid_type_error: "O preco deve ser um número",
    })
    .optional(),
});

export { createProdutoSchema, updateProdutoSchema };
