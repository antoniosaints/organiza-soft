import zodUtil from "../../utils/validations/zod_util";

const createParcelamento = zodUtil.object({
  transacaoId: zodUtil.number({
    required_error: "O transacaoId é obrigatório",
    invalid_type_error: "O transacaoId deve ser um número",
  }),
  parcela: zodUtil.number({
    required_error: "A parcela é obrigatória",
    invalid_type_error: "A parcela deve ser um número",
  }),
  status: zodUtil.enum(["pendente", "recebido", "cancelada"], {
    invalid_type_error: "O status deve ser pendente, recebido ou cancelada",
    required_error: "O status é obrigatório",
  }),
  valor: zodUtil.number({
    required_error: "O valor é obrigatório",
    invalid_type_error: "O valor deve ser um número",
  }),
  desconto: zodUtil.number({
    invalid_type_error: "O valor deve ser um número",
  }).optional(),
  valorRecebido: zodUtil.number({
    invalid_type_error: "O valorRecebido deve ser um número",
  }).optional(), // Tornando opcional para refletir a definição Prisma
  dataRecebimento: zodUtil.string({
    invalid_type_error: "A dataRecebimento deve ser uma string",
  }).optional(), // Também é opcional
  contaSistemaId: zodUtil.number({
    required_error: "O contaSistemaId é obrigatorio",
    invalid_type_error: "O contaSistemaId deve ser um número",
  }),
});

const updateParcelamento = zodUtil.object({
  transacaoId: zodUtil.number({
    invalid_type_error: "O transacaoId deve ser um number",
  }).optional(),
  parcela: zodUtil.number({
    invalid_type_error: "A parcela deve ser um number",
  }).optional(),
  status: zodUtil.enum(["pendente", "recebido", "cancelada"], {
    invalid_type_error: "O status deve ser pendente, recebido ou cancelada",
  }).optional(),
  valor: zodUtil.number({
    invalid_type_error: "O valor deve ser um number",
  }).optional(),
  desconto: zodUtil.number({
    invalid_type_error: "O valor deve ser um number",
  }).optional(),
  valorRecebido: zodUtil.number({
    invalid_type_error: "O valorRecebido deve ser um number",
  }).optional(),
  dataRecebimento: zodUtil.string({
    invalid_type_error: "A dataRecebimento deve ser uma string",
  }).optional()
});

export {
  createParcelamento,
  updateParcelamento
};
