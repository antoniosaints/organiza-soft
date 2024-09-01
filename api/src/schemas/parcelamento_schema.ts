import zodUtil from "../utils/validations/zod_util";

const createParcelamento = zodUtil.object({
  transacaoId: zodUtil.number({
    required_error: "O transacaoId e obrigatorio",
    invalid_type_error: "O transacaoId deve ser um number",
  }),
  parcela: zodUtil.number({
    required_error: "O parcela e obrigatorio",
    invalid_type_error: "O parcela deve ser um number",
  }),
  status: zodUtil.string({
    required_error: "O status e obrigatorio",
    invalid_type_error: "O status deve ser uma string",
  }),
  valor: zodUtil.number({
    required_error: "O valor e obrigatorio",
    invalid_type_error: "O valor deve ser um number",
  }),
  valorRecebido: zodUtil.number({
    required_error: "O valorRecebido e obrigatorio",
    invalid_type_error: "O valorRecebido deve ser um number",
  }),
})

const updateParcelamento = zodUtil.object({
  transacaoId: zodUtil.number({
    invalid_type_error: "O transacaoId deve ser um number",
  }).optional(),
  parcela: zodUtil.number({
    invalid_type_error: "O parcela deve ser um number",
  }).optional(),
  status: zodUtil.string({
    invalid_type_error: "O status deve ser uma string",
  }).optional(),
  valor: zodUtil.number({
    invalid_type_error: "O valor deve ser um number",
  }).optional(),
  valorRecebido: zodUtil.number({
    invalid_type_error: "O valorRecebido deve ser um number",
  }).optional(),
})

export {
  createParcelamento,
  updateParcelamento
}