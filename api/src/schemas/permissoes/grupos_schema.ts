import zodUtil from "../../utils/validations/zod_util";

const createGrupos = zodUtil.object({
  grupo: zodUtil.string({
    required_error: "O nome e obrigatorio",
    invalid_type_error: "O nome deve ser uma string",
  }),
  cor: zodUtil.string({
    required_error: "A cor e obrigatorio",
    invalid_type_error: "A cor deve ser uma string",
  }),
})

const updateGrupos = zodUtil.object({
  grupo: zodUtil.string({
    invalid_type_error: "O nome do grupo deve ser uma string"
  }).optional(),
  cor: zodUtil.string({
    invalid_type_error: "A cor do grupo deve ser uma string"
  }).optional(),
})

export {
  createGrupos,
  updateGrupos
}