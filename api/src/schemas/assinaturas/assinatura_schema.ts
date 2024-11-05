import zodUtil from "../../utils/validations/zod_util";

const createAssinatura = zodUtil.object({
  clienteId: zodUtil.number({
    required_error: "O ID do cliente é obrigatorio.",
    invalid_type_error: "O ID do cliente deve ser um number.",
  }),
  planoId: zodUtil.number({
    required_error: "O ID do plano é obrigatorio.",
    invalid_type_error: "O ID do plano deve ser um number.",
  }),
  dataInicio: zodUtil
    .string()
    .refine((val) => !isNaN(Date.parse(val)), {
      message: "Data de inicio invalida",
    }) // valida a string
    .transform((val) => new Date(val)),
  dataFim: zodUtil
    .string()
    .refine((val) => !isNaN(Date.parse(val)), {
      message: "Data fim invalida",
    }) // valida a string
    .transform((val) => new Date(val)),
  status: zodUtil
    .enum(["ativa", "vencida", "cancelada"], {
      invalid_type_error: "O status deve ser (ativa, vencida ou cancelada)",
    })
    .optional(),
  contaSistemaId: zodUtil.number({
    required_error: "O contaSistemaId é obrigatorio",
    invalid_type_error: "O contaSistemaId deve ser um number",
  }),
  dataBloqueio: zodUtil
    .string()
    .refine((val) => !isNaN(Date.parse(val)), {
      message: "Data de bloqueio invalida",
    })
    .transform((val) => new Date(val))
    .optional(),
  dataDesbloqueio: zodUtil
    .string()
    .refine((val) => !isNaN(Date.parse(val)), {
      message: "Data de desbloqueio invalida",
    })
    .transform((val) => new Date(val))
    .optional(),
});

const updateAssinatura = zodUtil.object({
  clienteId: zodUtil
    .number({
      invalid_type_error: "O ID do cliente deve ser um number",
    })
    .optional(),
  planoId: zodUtil
    .number({
      invalid_type_error: "O ID do plano deve ser um number",
    })
    .optional(),
  dataInicio: zodUtil
    .string()
    .refine((val) => !isNaN(Date.parse(val)), {
      message: "Data de início invalida",
    })
    .transform((val) => new Date(val))
    .optional(),
  dataFim: zodUtil
    .string()
    .refine((val) => !isNaN(Date.parse(val)), {
      message: "Data de fim invalida",
    })
    .transform((val) => new Date(val))
    .optional(),
  status: zodUtil
    .enum(["ativa", "vencida", "cancelada"], {
      invalid_type_error: "O status deve ser (ativa, vencida ou cancelada)",
    })
    .optional(),
  dataDesbloqueio: zodUtil
    .string()
    .refine((val) => !isNaN(Date.parse(val)), {
      message: "Data de desbloqueio invalida",
    })
    .transform((val) => new Date(val))
    .optional(),
  dataBloqueio: zodUtil
    .string()
    .refine((val) => !isNaN(Date.parse(val)), {
      message: "Data de bloqueio invalida",
    })
    .transform((val) => new Date(val))
    .optional()
});

export { createAssinatura, updateAssinatura };
