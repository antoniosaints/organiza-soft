import zodUtil from "../utils/validations/zod_util";

const createBloqueio = zodUtil.object({
  bloqueioID: zodUtil.string({
    required_error: "O ID do bloqueio é obrigatorio.",
    invalid_type_error: "O ID do bloqueio deve ser uma string"
  }),
  dataBloqueio: zodUtil.string({
    required_error: "A data de bloqueio é obrigatorio.",
    invalid_type_error: "A data de bloqueio deve ser uma string"
  }).refine((val) => !isNaN(Date.parse(val)), {
    message: "Data de bloqueio inválida."
  }).optional(),
  dataDesBloqueio: zodUtil.string({
    invalid_type_error: "A data de desbloqueio deve ser uma string"
  }).refine((val) => !isNaN(Date.parse(val)), {
    message: "Data de desbloqueio inválida."
  }).optional(),
  motivo: zodUtil.string({
    required_error: "O motivo do bloqueio é obrigatorio.",
    invalid_type_error: "O motivo do bloqueio deve ser uma string"
  }),
  dataFim: zodUtil.string({
    required_error: "A data de fim é obrigatorio.",
    invalid_type_error: "A data de fim deve ser uma string"
  }).refine((val) => !isNaN(Date.parse(val)), {
    message: "Data de fim inválida."
  }),
  status: zodUtil.string({
    required_error: "O status do bloqueio é obrigatorio.",
    invalid_type_error: "O status do bloqueio deve ser uma string"
  }),
})


const updateBloqueio = zodUtil.object({
  dataBloqueio: zodUtil.string({
    invalid_type_error: "A data de bloqueio deve ser uma string",
  }).refine((val) => !val || !isNaN(Date.parse(val)), {
    message: "Data de bloqueio inválida",
  }).optional(),
  dataDesBloqueio: zodUtil.string({
    invalid_type_error: "A data de desbloqueio deve ser uma string"
  }).refine((val) => !isNaN(Date.parse(val)), {
    message: "Data de desbloqueio inválida."
  }).optional(),
  dataFim: zodUtil.string({
    invalid_type_error: "A data de fim deve ser uma string",
  }).refine((val) => !val || !isNaN(Date.parse(val)), {
    message: "Data de fim inválida",
  }).optional(),
  status: zodUtil.string({
    invalid_type_error: "O status deve ser uma string",
  }).optional(),
})

export {
  createBloqueio,
  updateBloqueio
}