import zodUtil from "../utils/validations/zod_util";

const createBloqueio = zodUtil.object({
  assinaturaId: zodUtil.number({
    required_error: "O ID da assinatura é obrigatorio.",
    invalid_type_error: "O ID da assinatura deve ser um number"
  }),
  dataBloqueio: zodUtil.string({
    required_error: "A data de bloqueio é obrigatorio.",
    invalid_type_error: "A data de bloqueio deve ser uma string"
  }).refine((val) => !isNaN(Date.parse(val)), {
    message: "Data de bloqueio inválida."
  }).optional(),
  dataDesbloqueio: zodUtil.string({
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
  assinaturaId: zodUtil.number({
    invalid_type_error: "O ID da assinatura deve ser um number"
  }).optional(),
  dataBloqueio: zodUtil.string({
    invalid_type_error: "A data de bloqueio deve ser uma string",
  }).refine((val) => !val || !isNaN(Date.parse(val)), {
    message: "Data de bloqueio inválida",
  }).optional(),
  dataDesbloqueio: zodUtil.string({
    invalid_type_error: "A data de desbloqueio deve ser uma string"
  }).refine((val) => !isNaN(Date.parse(val)), {
    message: "Data de desbloqueio inválida."
  }).optional(),
})

export {
  createBloqueio,
  updateBloqueio
}