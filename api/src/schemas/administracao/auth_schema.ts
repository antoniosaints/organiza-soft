import zodUtil from "../../utils/validations/zod_util";

const createAuth = zodUtil.object({
  email: zodUtil.string({
    required_error: "O email e obrigatorio",
    invalid_type_error: "O email deve ser uma string",
  }),
  senha: zodUtil.string({
    required_error: "A senha e obrigatoria", 
    invalid_type_error: "A senha deve ser uma string"
  })
})

export {
  createAuth
}