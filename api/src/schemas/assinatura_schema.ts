import zodUtil from "../utils/validations/zod_util";

const createAssinatura = zodUtil.object({
  clienteId: zodUtil.string({
    required_error: "O ID do cliente é obrigatorio.",
    invalid_type_error: "O ID do cliente deve ser uma String."
  }),
  planoId: zodUtil.string({
    required_error: "O ID do plano é obrigatorio.",
    invalid_type_error: "O ID do plano deve ser uma String."
  }),
  dataInicio: zodUtil.string({
    required_error: "A data de inicio é obrigatorio.",
    invalid_type_error: "A data de inicio deve ser uma String."
  }).refine((val) => !isNaN(Date.parse(val)), {
    message: "Data de início inválida."
  }),
  dataFim: zodUtil.string({
    required_error: "A data de fim é obrigatoria.",
    invalid_type_error: "A data de fim deve ser uma String."
  }).refine((val) => !isNaN(Date.parse(val)), {
    message: "Data de fim inválida."
  }),
  status: zodUtil.string({
    required_error: "O status da assinatura é obrigatoria.",
    invalid_type_error: "O status da assinatura deve ser uma String"
  }),
  dataBlqueio: zodUtil.string({
    required_error: "A data de bloqueio é obrigatoria.",
    invalid_type_error: "A data de bloqueio deve ser uma String"
  }).refine((val) => !isNaN(Date.parse(val)), {
    message: "Data de bloqueio inválida."
  }),
  dataBloqueio: zodUtil.string({
    invalid_type_error: "A data de bloqueio deve ser uma string",
  }).refine((val) => !val || !isNaN(Date.parse(val)), {
    message: "Data de bloqueio inválida",
  }).optional(),
});

const updateAssinatura = zodUtil.object({
  clienteId: zodUtil.string({
    invalid_type_error: "O ID do cliente deve ser uma string",
  }).optional(),
  planoId: zodUtil.string({
    invalid_type_error: "O ID do plano deve ser uma string",
  }).optional(),
  dataInicio: zodUtil.string({
    invalid_type_error: "A data de início deve ser uma string",
  }).refine((val) => !val || !isNaN(Date.parse(val)), {
    message: "Data de início inválida",
  }).optional(),
  dataFim: zodUtil.string({
    invalid_type_error: "A data de fim deve ser uma string",
  }).refine((val) => !val || !isNaN(Date.parse(val)), {
    message: "Data de fim inválida",
  }).optional(),
  status: zodUtil.string({
    invalid_type_error: "O status deve ser uma string",
  }).optional(),
  dataDesbloqueio: zodUtil.string({
    invalid_type_error: "A data de desbloqueio deve ser uma string",
  }).refine((val) => !val || !isNaN(Date.parse(val)), {
    message: "Data de desbloqueio inválida",
  }).optional(),
  dataBloqueio: zodUtil.string({
    invalid_type_error: "A data de bloqueio deve ser uma string",
  }).refine((val) => !val || !isNaN(Date.parse(val)), {
    message: "Data de bloqueio inválida",
  }).optional(),
});

export {
  createAssinatura,
  updateAssinatura
}
