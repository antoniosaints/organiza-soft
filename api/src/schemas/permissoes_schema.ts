import zodUtil from "../utils/validations/zod_util";

const createPermissoes = zodUtil.object({
  permissao: zodUtil.string({
    required_error: "A permissão e obrigatorio",
    invalid_type_error: "A permissão deve ser uma string",
  }),
  status: zodUtil.string({
    required_error: "O status e obrigatorio",
    invalid_type_error: "O status deve ser uma string",
  }),
  slug: zodUtil.string({
    required_error: "O slug e obrigatorio",
    invalid_type_error: "O slug deve ser uma string",
  }),
  cor: zodUtil.string({
    invalid_type_error:"O campo cor deve ser uma string"
  }).optional(),
})

const updatePermissoes = zodUtil.object({
  permissao: zodUtil.string({
    invalid_type_error: "A permissão deve ser uma string",
  }).optional(),
  status: zodUtil.string({
    invalid_type_error: "O status deve ser uma string",
  }).optional(),
  slug: zodUtil.string({
    invalid_type_error: "O slug deve ser uma string",
  }).optional(),
  cor: zodUtil.string({
    invalid_type_error:"O campo cor deve ser uma string"
  }).optional(),
})

export {
  createPermissoes,
  updatePermissoes
}