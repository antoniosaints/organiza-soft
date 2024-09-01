import zodUtil from "../utils/validations/zod_util";

const createParcelamento = zodUtil.object({
  id: zodUtil.number({
    required_error: "O id é obrigatório",
    invalid_type_error: "O id deve ser um number",
  }).optional(), // Geralmente o id é opcional na criação se é autogerado
  transacaoId: zodUtil.number({
    required_error: "O transacaoId é obrigatório",
    invalid_type_error: "O transacaoId deve ser um number",
  }),
  parcela: zodUtil.number({
    required_error: "A parcela é obrigatória",
    invalid_type_error: "A parcela deve ser um number",
  }),
  status: zodUtil.string({
    required_error: "O status é obrigatório",
    invalid_type_error: "O status deve ser uma string",
  }),
  valor: zodUtil.number({
    required_error: "O valor é obrigatório",
    invalid_type_error: "O valor deve ser um number",
  }),
  valorRecebido: zodUtil.number({
    invalid_type_error: "O valorRecebido deve ser um number",
  }).optional(), // Tornando opcional para refletir a definição Prisma
  dataRecebimento: zodUtil.string({
    invalid_type_error: "A dataRecebimento deve ser uma string",
  }).optional(), // Também é opcional
  dataCadastro: zodUtil.string({
    required_error: "A dataCadastro é obrigatória",
    invalid_type_error: "A dataCadastro deve ser uma string",
  }).optional(), // Geralmente preenchido automaticamente com `now()`
});

const updateParcelamento = zodUtil.object({
  id: zodUtil.number({
    invalid_type_error: "O id deve ser um number",
  }).optional(),
  transacaoId: zodUtil.number({
    invalid_type_error: "O transacaoId deve ser um number",
  }).optional(),
  parcela: zodUtil.number({
    invalid_type_error: "A parcela deve ser um number",
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
  dataRecebimento: zodUtil.string({
    invalid_type_error: "A dataRecebimento deve ser uma string",
  }).optional(),
  dataCadastro: zodUtil.string({
    invalid_type_error: "A dataCadastro deve ser uma string",
  }).optional(),
});

export {
  createParcelamento,
  updateParcelamento
};
