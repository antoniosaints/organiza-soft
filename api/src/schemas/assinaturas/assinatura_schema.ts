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
  dataInicio: zodUtil.date({
    required_error: "A data de inicio é obrigatorio.",
    invalid_type_error: "A data de inicio deve ser uma data valida.",
  }),
  dataFim: zodUtil.date({
    required_error: "A data de fim é obrigatoria.",
    invalid_type_error: "A data de fim deve ser uma data valida.",
  }),
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
    .date({
      invalid_type_error: "A data de bloqueio deve ser uma data valida.",
    })
    .optional(),
  dataDesbloqueio: zodUtil
    .date({
      invalid_type_error: "A data de desbloqueio deve ser uma data valida.",
    })
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
    .date({
      invalid_type_error: "A data de início deve ser uma data válida",
    })
    .optional(),
  dataFim: zodUtil
    .date({
      invalid_type_error: "A data de fim deve ser uma data válida",
    })
    .optional(),
  status: zodUtil
    .enum(["ativa", "vencida", "cancelada"], {
      invalid_type_error: "O status deve ser (ativa, vencida ou cancelada)",
    })
    .optional(),
  dataDesbloqueio: zodUtil
    .date({
      invalid_type_error: "A data de desbloqueio deve ser uma data válida",
    })
    .optional(),
  dataBloqueio: zodUtil
    .date({
      invalid_type_error: "A data de bloqueio deve ser uma data válida",
    })
    .optional(),
  contaSistemaId: zodUtil
    .number({
      invalid_type_error: "O contaSistemaId deve ser um number",
    })
    .optional(),
});

export { createAssinatura, updateAssinatura };
