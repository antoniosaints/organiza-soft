import zodUtil from "../utils/validations/zod_util";

const createBloqueio = zodUtil.object({
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
})

export {
  createBloqueio,
  updateBloqueio
}