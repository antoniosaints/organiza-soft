import zodUtil from "../../utils/validations/zod_util";
const createConta = zodUtil.object({
  conta: zodUtil.string({
    required_error: "O nome e obrigatorio",
    invalid_type_error: "O nome deve ser uma string",
  }),
  saldo: zodUtil.number({
    required_error: "O saldo e obrigatorio",
    invalid_type_error: "O saldo deve ser um number",
  }),
  regra: zodUtil.enum(["privada", "publica"], {
    invalid_type_error: "A regra deve ser privada ou publica",
    required_error: "A regra e obrigatoria",
  }),
  cor: zodUtil.string({
    required_error: "A cor e obrigatorio",
    invalid_type_error: "A cor deve ser uma string",
  }),
  descricao: zodUtil.string({
    required_error: "A descricao e obrigatorio",
    invalid_type_error: "A descricao deve ser uma string",
  }),
  userId: zodUtil.number({
    required_error: "O userId e obrigatorio",
    invalid_type_error: "O userId deve ser um number",
  }),
  contaSistemaId: zodUtil.number({
    required_error: "O contaSistemaId é obrigatorio",
    invalid_type_error: "O contaSistemaId deve ser um number",
  }),
})

const updateConta = zodUtil.object({
  conta: zodUtil.string({
    invalid_type_error: "O nome deve ser uma string",
  }).optional(),
  saldo: zodUtil.number({
    invalid_type_error: "O saldo deve ser um number",
  }).optional(),
  regra: zodUtil.enum(["privada", "publica"], {
    invalid_type_error: "A regra deve ser privada ou publica",
  }).optional(),
  userId: zodUtil.number({
    invalid_type_error: "O userId deve ser um number",
  }).optional(),
  cor: zodUtil.string({
    invalid_type_error: "A cor deve ser uma string",
  }).optional(),
  descricao: zodUtil.string({
    invalid_type_error: "A descricao deve ser uma string",
  }).optional(),
  contaSistemaId: zodUtil.number({
    invalid_type_error: "O contaSistemaId deve ser um number",
  }).optional()
})

export {
  createConta,
  updateConta
}