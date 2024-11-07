import zodUtil from "../../utils/validations/zod_util";

const LancamentoBodySchema = zodUtil.object({
  contaSistemaId: zodUtil
    .number({
      required_error: "O contaSistemaId é obrigatorio",
      invalid_type_error: "O contaSistemaId deve ser um número",
    })
    .int("O contaSistemaId deve ser um inteiro"),
  descricao: zodUtil.string({
    required_error: "A descrição é obrigatorio",
    invalid_type_error: "A descrição deve ser uma string",
  }),
  usuarioLancamento: zodUtil.number({
    required_error: "O usuarioLancamento é obrigatorio",
    invalid_type_error: "O usuarioLancamento deve ser um number",
  }),
  tipoLancamento: zodUtil.enum(["receita", "despesa"], {
    invalid_type_error: "O tipoLancamento deve ser receita ou despesa",
    required_error: "O tipoLancamento é obrigatorio",
  }),
  categoria: zodUtil.number({
    invalid_type_error: "A categoria deve ser um number",
    required_error: "A categoria é obrigatoria",
  }),
  fornecedor: zodUtil.number({
    invalid_type_error: "O fornecedor deve ser um number",
    required_error: "O fornecedor é obrigatorio",
  }),
  conta: zodUtil.number({
    invalid_type_error: "A conta deve ser um number",
    required_error: "A conta é obrigatoria",
  }),
  parcelado: zodUtil
    .enum(["sim", "nao"], {
      invalid_type_error: "O parcelado deve ser sim ou nao",
    })
    .default("nao")
    .optional(),
  quantidadeParcelas: zodUtil
    .number({
      invalid_type_error: "A quantidade de parcelas deve ser um number",
    })
    .refine((val) => val >= 0, {
      message: "Quantidade de parcelas deve ser maior que 0",
    })
    .optional()
});

export { LancamentoBodySchema };
