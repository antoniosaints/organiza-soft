import zodUtil from "../utils/validations/zod_util";

const createAuth = zodUtil.object({
  authId: zodUtil.string({
    required_error: "O authId e obrigatorio",
    invalid_type_error: "O authId deve ser uma string",
  }),
  email: zodUtil.string({
    required_error: "O email e obrigatorio",
    invalid_type_error: "O email deve ser uma string",
  }),
  senha: zodUtil.string({
    required_error: "A senha e obrigatoria", 
    invalid_type_error: "A senha deve ser uma string"
  })
})

const updateAuth = zodUtil.object({
  email: zodUtil.string({
    invalid_type_error: "O email deve ser uma string",
  }).optional(),
  senha: zodUtil.string({
    invalid_type_error: "A senha deve ser uma string"
  }).optional(),
  })

export {
  createAuth,
  updateAuth
}