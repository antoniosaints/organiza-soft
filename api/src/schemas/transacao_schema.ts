import zodUtil from "../utils/validations/zod_util";

const createTransacao = zodUtil.object({
  clienteId: zodUtil.number({
    required_error: "O clienteId e obrigatorio",
    invalid_type_error: "O clienteId deve ser um number",
  }),
  operacao: zodUtil.string({
    required_error: "A operacao e obrigatorio",
    invalid_type_error: "A operacao deve ser uma string",
  }),
  natureza: zodUtil.string({
    required_error: "A natureza e obrigatorio",
    invalid_type_error: "A natureza deve ser uma string",
  }),
  contaId: zodUtil.number({
    required_error: "A contaId e obrigatorio",
    invalid_type_error: "A contaId deve ser um number",
  }),
  formaPagamentoId: zodUtil.number({
    required_error: "A formaPagamentoId e obrigatorio",
    invalid_type_error: "A formaPagamentoId deve ser um number",
  }),
  planoId: zodUtil.number({
    required_error: "O planoId e obrigatorio",
    invalid_type_error: "O planoId deve ser um number",
  }),
  servicoId: zodUtil.number({
    required_error: "O servicoId e obrigatorio",
    invalid_type_error: "O servicoId deve ser um number",
  }),
  categoriasId: zodUtil.number({
    required_error: "As categoriasId e obrigatorio",
    invalid_type_error: "As categoriasId deve ser um number",
  }),
  parcelado: zodUtil.boolean({
    required_error: "O parcelado e obrigatorio",
    invalid_type_error: "O parcelado deve ser um boolean",
  }),
  parcelamentoId: zodUtil.number({
    required_error: "O parcelamentoId e obrigatorio",
    invalid_type_error: "O parcelamentoId deve ser um number",
  }),
  valor: zodUtil.number({
    required_error: "O valor e obrigatorio",
    invalid_type_error: "O valor deve ser um number",
  }),
  desconto: zodUtil.number({
    required_error: "O desconto e obrigatorio",
    invalid_type_error: "O desconto deve ser um number",
  }),
  valorFinal: zodUtil.number({
    required_error: "O valorFinal e obrigatorio",
    invalid_type_error: "O valorFinal deve ser um number",
  }),
  dataEfetivado: zodUtil.date({
    required_error: "A dataEfetivado e obrigatorio",
    invalid_type_error: "A dataEfetivado deve ser uma date",
  }),
  dataLancamento: zodUtil.date({
    required_error: "A dataLancamento e obrigatorio",
    invalid_type_error: "A dataLancamento deve ser uma date",
  }),
  status: zodUtil.string({
    required_error: "O status e obrigatorio",
    invalid_type_error: "O status deve ser uma string",
  }),
  descricao: zodUtil.string({
    required_error: "A descricao e obrigatorio",
    invalid_type_error: "A descricao deve ser uma string",
  }),
})

const updateTransacao = zodUtil.object({
  clienteId: zodUtil.number({
    invalid_type_error: "O clienteId deve ser um number",
  }).optional(),
  operacao: zodUtil.string({
    invalid_type_error: "A operacao deve ser uma string",
  }).optional(),
  natureza: zodUtil.string({
    invalid_type_error: "A natureza deve ser uma string",
  }).optional(),
  contaId: zodUtil.number({
    invalid_type_error: "A contaId deve ser um number",
  }).optional(),
  formaPagamentoId: zodUtil.number({
    invalid_type_error: "A formaPagamentoId deve ser um number",
  }).optional(),
  planoId: zodUtil.number({
    invalid_type_error: "O planoId deve ser um number",
  }).optional(),
  servicoId: zodUtil.number({
    invalid_type_error: "O servicoId deve ser um number",
  }).optional(),
  categoriasId: zodUtil.number({
    invalid_type_error: "As categoriasId deve ser um number",
  }).optional(),
  parcelado: zodUtil.boolean({
    invalid_type_error: "O parcelado deve ser um boolean",
  }).optional(),
  parcelamentoId: zodUtil.number({
    invalid_type_error: "O parcelamentoId deve ser um number",
  }).optional(),
  valor: zodUtil.number({
    invalid_type_error: "O valor deve ser um number",
  }).optional(),
  desconto: zodUtil.number({
    invalid_type_error: "O desconto deve ser um number",
  }).optional(),
  valorFinal: zodUtil.number({
    invalid_type_error: "O valorFinal deve ser um number",
  }).optional(),
  dataEfetivado: zodUtil.date({
    invalid_type_error: "A dataEfetivado deve ser uma date",
  }).optional(),
  dataLancamento: zodUtil.date({
    invalid_type_error: "A dataLancamento deve ser uma date",
  }).optional(),
  status: zodUtil.string({
    invalid_type_error: "O status deve ser uma string",
  }).optional(),
  descricao: zodUtil.string({
    invalid_type_error: "A descricao deve ser uma string",
  }).optional(),
})

export {
  createTransacao,
  updateTransacao
}