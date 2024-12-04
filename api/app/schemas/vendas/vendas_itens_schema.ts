import zodUtil from "../../utils/validations/zod_util";

const createItensVenda = zodUtil.object({
  contaSistemaId: zodUtil
    .number({
      required_error: "O contaSistemaId é obrigatorio",
      invalid_type_error: "O contaSistemaId deve ser um número",
    })
    .int("O contaSistemaId deve ser um inteiro"),
  vendaId: zodUtil
    .number({
      required_error: "A vendaId é obrigatorio",
      invalid_type_error: "A contaSistemaId deve ser um número",
    })
    .int("O vendaId deve ser um inteiro"),
  produtoId: zodUtil
    .number({
      required_error: "O produtoId é obrigatorio",
      invalid_type_error: "O produtoId deve ser um número",
    })
    .int("O produtoId deve ser um inteiro"),
  produto: zodUtil.string({
    required_error: "O nome do produto é obrigatorio",
    invalid_type_error: "O nome do produto deve ser uma string",
  }),
  quantidade: zodUtil
    .number({
      invalid_type_error: "O campo quantidade deve ser um número",
      required_error: "O campo quantidade é obrigatorio",
    })
    .refine((val) => val >= 0, { message: "Quantidade deve ser positiva" }),
  preco: zodUtil
    .number({
      invalid_type_error: "O campo preco deve ser um número",
      required_error: "O campo preco é obrigatorio",
    })
    .refine((val) => val >= 0, { message: "Preço deve ser positivo" }),
  total: zodUtil
    .number({
      invalid_type_error: "O campo total deve ser um número",
      required_error: "O campo total é obrigatorio",
    })
    .refine((val) => val >= 0, { message: "Total deve ser positivo" }),
});

const updateItensVenda = zodUtil.object({
  vendaId: zodUtil
    .number({
      invalid_type_error: "A contaSistemaId deve ser um número",
    })
    .int("O vendaId deve ser um inteiro")
    .optional(),
  produtoId: zodUtil
    .number({
      invalid_type_error: "O produtoId deve ser um número",
    })
    .int("O produtoId deve ser um inteiro")
    .optional(),
  produto: zodUtil
    .string({
      invalid_type_error: "O nome do produto deve ser uma string",
    })
    .optional(),
  quantidade: zodUtil
    .number({
      invalid_type_error: "O campo quantidade deve ser um número",
    })
    .optional(),
  preco: zodUtil
    .number({
      invalid_type_error: "O campo preco deve ser um número",
    })
    .refine((val) => val >= 0, { message: "Preço deve ser positivo" })
    .optional(),
  total: zodUtil
    .number({
      invalid_type_error: "O campo total deve ser um número",
    })
    .refine((val) => val >= 0, { message: "Total deve ser positivo" })
    .optional(),
});

export { createItensVenda, updateItensVenda };
