import zodUtil from "../../utils/validations/zod_util";

const createBloqueio = zodUtil.object({
  assinaturaId: zodUtil.number({
    required_error: "O ID da assinatura é obrigatorio.",
    invalid_type_error: "O ID da assinatura deve ser um number",
  }),
  motivo: zodUtil.string({
    required_error: "O motivo do bloqueio é obrigatorio.",
    invalid_type_error: "O motivo do bloqueio deve ser uma string",
  }),
  contaSistemaId: zodUtil.number({
    required_error: "O contaSistemaId é obrigatorio",
    invalid_type_error: "O contaSistemaId deve ser um number",
  }),
});

const updateBloqueio = zodUtil.object({
  motivo: zodUtil
    .string({
      invalid_type_error: "O motivo do bloqueio deve ser uma string",
    })
    .optional(),
  assinaturaId: zodUtil
    .number({
      invalid_type_error: "O ID da assinatura deve ser um number",
    })
    .optional(),
  dataBloqueio: zodUtil
    .string()
    .refine((val) => !isNaN(Date.parse(val)), {
      message: "Data de bloqueio invalida",
    }) // valida a string
    .transform((val) => new Date(val))
    .optional(),
  dataDesbloqueio: zodUtil
    .string()
    .refine((val) => !isNaN(Date.parse(val)), {
      message: "Data de desbloqueio invalida",
    }) // valida a string
    .transform((val) => new Date(val))
    .optional()
});

export { createBloqueio, updateBloqueio };
