import zodUtil from "../utils/validations/zod_util";

const createCategoria = zodUtil.object({
  categoria: zodUtil.string({
    required_error: "A categoria e obrigatorio",
    invalid_type_error: "A categoria deve ser uma string",
  }),
  cor: zodUtil.string({
    required_error: "A cor e obrigatorio",
    invalid_type_error: "A cor deve ser uma string",
  }),
  contaSistemaId: zodUtil.number({
    required_error: "O contaSistemaId é obrigatorio",
    invalid_type_error: "O contaSistemaId deve ser um number",
  }),
})

const updateCategoria = zodUtil.object({
  categoria: zodUtil.string({
    invalid_type_error: "A categoria deve ser uma string",
  }).optional(),
  cor: zodUtil.string({
    invalid_type_error: "A cor deve ser uma string",
  }).optional(),
  contaSistemaId: zodUtil.number({
    invalid_type_error: "O contaSistemaId deve ser um number",
  }).optional()
})

export {
  createCategoria,
  updateCategoria
}