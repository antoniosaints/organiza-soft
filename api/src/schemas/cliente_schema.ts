import zodUtil from "../utils/validations/zod_util";

const createCliente = zodUtil.object({
  nome: zodUtil.string({
    required_error: "O nome e obrigatorio",
    invalid_type_error: "O nome deve ser uma string",
  }),
  email: zodUtil.string({
    required_error: "O email e obrigatorio",
    invalid_type_error: "O email deve ser uma string",
  }).email({
    message: "O email deve ser um email valido",
  }).toLowerCase().trim(),
  telefone: zodUtil.string({
    required_error: "O telefone e obrigatorio",
    invalid_type_error: "O telefone deve ser uma string",
  }),
  endereco: zodUtil.string({
    required_error: "O endereço e obrigatorio",
    invalid_type_error: "O endereço deve ser uma string",
  }),
})

const updateCliente = zodUtil.object({
  nome: zodUtil.string({
    invalid_type_error: "O nome deve ser uma string",
  }).optional(),
  email: zodUtil.string({
    invalid_type_error: "O email deve ser uma string",
  }).email({
    message: "O email deve ser um email valido",
  }).toLowerCase().trim().optional(),
  telefone: zodUtil.string({
    invalid_type_error: "O telefone deve ser uma string",
  }).optional(),
  endereco: zodUtil.string({
    invalid_type_error: "O endereço deve ser uma string",
  }).optional(),
})

export {
  createCliente,
  updateCliente
}