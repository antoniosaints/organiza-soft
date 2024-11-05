import zodUtil from "../../utils/validations/zod_util";

const createPagamentoVenda = zodUtil.object({
  contaSistemaId: zodUtil
    .number({
      required_error: "O campo 'contaSistemaId' é obrigatório.",
      invalid_type_error:
        "O campo 'contaSistemaId' deve ser um número inteiro.",
    })
    .int(),
  vendaId: zodUtil
    .number({
      required_error: "O campo 'vendaId' é obrigatório.",
      invalid_type_error: "O campo 'vendaId' deve ser um número inteiro.",
    })
    .int(),
  valor: zodUtil
    .number({
      required_error: "O campo 'valor' é obrigatório.",
      invalid_type_error: "O campo 'valor' deve ser um número decimal.",
    })
    .refine((val) => val >= 0, {
      message: "O valor deve ser um número positivo.",
    }),

  metodoPagamento: zodUtil.enum(
    ["pix", "dinheiro", "cartao", "transferencia", "boleto", "cheque"],
    {
      required_error: "O metodoPagamento é obrigatorio",
      invalid_type_error:
        "O metodoPagamento deve ser uma das seguintes opções: (pix, dinheiro, cartao, transferencia, boleto ou cheque)",
    }
  ),

  statusPagamento: zodUtil.enum(
    ["pendente", "pago", "cancelado", "processando", "estornado"],
    {
      invalid_type_error:
        "O statusPagamento deve ser pendente, recebido, cancelado, processando ou estornado",
      required_error: "O statusPagamento é obrigatório",
    }
  ),

  gatewayId: zodUtil.string({
    required_error: "O campo 'gatewayId' é obrigatório.",
    invalid_type_error: "O campo 'gatewayId' deve ser uma string.",
  }),
});

const updatePagamentoVenda = zodUtil.object({
  statusPagamento: zodUtil
    .enum(["pendente", "pago", "cancelado", "processando", "estornado"], {
      invalid_type_error:
        "O statusPagamento deve ser pendente, recebido, cancelado, processando ou estornado",
    })
    .optional(),
  metodoPagamento: zodUtil
    .enum(["pix", "dinheiro", "cartao", "transferencia", "boleto", "cheque"], {
      invalid_type_error:
        "O metodoPagamento deve ser uma das seguintes opções: (pix, dinheiro, cartao, transferencia, boleto ou cheque)",
    })
    .optional(),
});

export { createPagamentoVenda, updatePagamentoVenda };
