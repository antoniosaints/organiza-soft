import zodUtil from "../../utils/validations/zod_util";

const createProdutoCategoriaSchema = zodUtil.object({
  categoria: zodUtil
    .string({
      invalid_type_error: "O nome da categoria deve ser uma string",
      required_error: "O nome da categoria é obrigatório",
    }),
  cor: zodUtil
    .string({
      invalid_type_error: "A cor deve ser uma string",
    }).optional(),
  contaSistemaId: zodUtil
    .number({
      invalid_type_error: "O contaSistemaId deve ser um number",
      required_error: "O contaSistemaId é obrigatório",
    }),
  descricao: zodUtil
    .string({
      invalid_type_error: "A descrição deve ser uma string",
    }).optional(),
});

const updateProdutoCategoriaSchema = zodUtil.object({
  categoria: zodUtil
    .string({
      invalid_type_error: "O nome da categoria deve ser uma string",
    }).optional(),
  cor: zodUtil
    .string({
      invalid_type_error: "A cor deve ser uma string",
    }).optional(),
  contaSistemaId: zodUtil
    .number({
      invalid_type_error: "O contaSistemaId deve ser um number",
    }).optional(),
  descricao: zodUtil
    .string({
      invalid_type_error: "A descrição deve ser uma string",
    }).optional(),
});

export { createProdutoCategoriaSchema, updateProdutoCategoriaSchema };
