import zodUtil from "../../utils/validations/zod_util";

const createPermissoes = zodUtil.object({
  permissao: zodUtil.string({
    required_error: "A permissão e obrigatorio",
    invalid_type_error: "A permissão deve ser uma string",
  }),
  status: zodUtil.enum(["ativo", "inativo"], {
    invalid_type_error: "O status deve ser ativo ou inativo",
    required_error: "O status é obrigatório",
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
  status: zodUtil.enum(["ativo", "inativo"], {
    invalid_type_error: "O status deve ser ativo ou inativo",
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