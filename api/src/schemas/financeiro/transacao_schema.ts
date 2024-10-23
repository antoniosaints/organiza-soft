import zodUtil from "../../utils/validations/zod_util";

const createTransacao = zodUtil.object({
  clienteId: zodUtil.number({
    required_error: "O clienteId é obrigatório",
    invalid_type_error: "O clienteId deve ser um number",
  }),
  valor: zodUtil.number({
    required_error: "O valor é obrigatório",
    invalid_type_error: "O valor deve ser um number",
  }),
  descricao: zodUtil
    .string({
      invalid_type_error: "A descrição deve ser uma string",
    })
    .optional(),
  categoriasId: zodUtil.number({
    required_error: "As categoriasId é obrigatória",
    invalid_type_error: "As categoriasId deve ser um number",
  }),
  contaId: zodUtil.number({
    required_error: "O contaId é obrigatório",
    invalid_type_error: "O contaId deve ser um number",
  }),
  dataEfetivado: zodUtil
    .date({
      invalid_type_error: "A dataEfetivado deve ser uma date",
    })
    .optional(),
  dataLancamento: zodUtil.date({
    required_error: "A dataLancamento é obrigatória",
    invalid_type_error: "A dataLancamento deve ser uma date",
  }),
  desconto: zodUtil
    .number({
      invalid_type_error: "O desconto deve ser um number",
    })
    .optional(),
  formaPagamentoId: zodUtil.number({
    required_error: "A formaPagamentoId é obrigatória",
    invalid_type_error: "A formaPagamentoId deve ser um number",
  }),
  natureza: zodUtil.enum(["receita", "despesa"], {
    invalid_type_error: "A natureza deve ser receita ou despesa",
    required_error: "A natureza é obrigatória",
  }),
  operacao: zodUtil.enum(["entrada", "saida", "transferencia", "ajuste"], {
    invalid_type_error:
      "A operação deve ser entrada, saida, transferencia ou ajuste",
    required_error: "A operação é obrigatória",
  }),
  parcelado: zodUtil
    .enum(["sim", "nao"], {
      invalid_type_error: "O parcelado deve ser sim ou não",
    })
    .optional(),
  status: zodUtil.enum(["pendente", "recebido", "cancelada"], {
    invalid_type_error: "O status deve ser pendente, recebido ou cancelada",
    required_error: "O status é obrigatório",
  }),
  valorFinal: zodUtil.number({
    required_error: "O valorFinal é obrigatório",
    invalid_type_error: "O valorFinal deve ser um number",
  }),
  contaSistemaId: zodUtil.number({
    required_error: "O contaSistemaId é obrigatorio",
    invalid_type_error: "O contaSistemaId deve ser um number",
  }),
});

const updateTransacao = zodUtil.object({
  clienteId: zodUtil
    .number({
      invalid_type_error: "O clienteId deve ser um number",
    })
    .optional(),
  valor: zodUtil
    .number({
      invalid_type_error: "O valor deve ser um number",
    })
    .optional(),
  descricao: zodUtil
    .string({
      invalid_type_error: "A descrição deve ser uma string",
    })
    .optional(),
  categoriasId: zodUtil
    .number({
      invalid_type_error: "As categoriasId deve ser um number",
    })
    .optional(),
  contaId: zodUtil
    .number({
      invalid_type_error: "O contaId deve ser um number",
    })
    .optional(),
  dataEfetivado: zodUtil
    .date({
      invalid_type_error: "A dataEfetivado deve ser uma date",
    })
    .optional(),
  dataLancamento: zodUtil
    .date({
      invalid_type_error: "A dataLancamento deve ser uma date",
    })
    .optional(),
  desconto: zodUtil
    .number({
      invalid_type_error: "O desconto deve ser um number",
    })
    .optional(),
  formaPagamentoId: zodUtil
    .number({
      invalid_type_error: "A formaPagamentoId deve ser um number",
    })
    .optional(),
  natureza: zodUtil
    .enum(["receita", "despesa"], {
      invalid_type_error: "A natureza deve ser receita ou despesa",
    })
    .optional(),
  operacao: zodUtil
    .enum(["entrada", "saida", "transferencia", "ajuste"], {
      invalid_type_error:
        "A operação deve ser entrada, saida, transferencia ou ajuste",
    })
    .optional(),
  parcelado: zodUtil
    .enum(["sim", "nao"], {
      invalid_type_error: "O parcelado deve ser sim ou não",
    })
    .optional(),
  status: zodUtil
    .enum(["pendente", "recebido", "cancelada"], {
      invalid_type_error: "O status deve ser pendente, recebido ou cancelada",
    })
    .optional(),
  valorFinal: zodUtil
    .number({
      invalid_type_error: "O valorFinal deve ser um number",
    })
    .optional()
});

export { createTransacao, updateTransacao };
