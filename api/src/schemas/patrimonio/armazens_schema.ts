import zodUtil from "../../utils/validations/zod_util";

const createArmazenSchema = zodUtil.object({
  armazen: zodUtil.string({
    required_error: "O campo armazen é obrigatorio",
    invalid_type_error: "O armazen deve ser uma string",
  }),
  local: zodUtil
    .string({
      invalid_type_error: "O campo local deve ser uma string",
    })
    .optional(),
  contaSistemaId: zodUtil.number({
    required_error: "O contaSistemaId é obrigatorio",
    invalid_type_error: "O contaSistemaId deve ser um number",
  }),
});

const updateArmazenSchema = zodUtil.object({
  armazen: zodUtil
    .string({
      invalid_type_error: "O campo armazen deve ser uma string",
    })
    .optional(),
  local: zodUtil
    .string({
      invalid_type_error: "O campo local deve ser uma string",
    })
    .optional(),
  contaSistemaId: zodUtil
    .number({
      invalid_type_error: "O contaSistemaId deve ser um number",
    })
    .optional(),
});

export { createArmazenSchema, updateArmazenSchema };
