import zodUtil from "../../utils/validations/zod_util";

const createVendasPdv = zodUtil.object({
  uniqueId: zodUtil.string({
    required_error: "O uniqueId é obrigatorio",
    invalid_type_error: "O uniqueId deve ser uma string",
  }),
  contaSistemaId: zodUtil.number({
    required_error: "O contaSistemaId é obrigatorio",
    invalid_type_error: "O contaSistemaId deve ser um number",
  }),
  clienteId: zodUtil.number({
    invalid_type_error: "O clienteId deve existir no sistema",
    required_error: "O clienteId é obrigatório",
  }),
  vendedorId: zodUtil.number({
    required_error: "O vendedorId é obrigatorio",
    invalid_type_error: "O vendedorId deve existir no sistema",
  }),
  valor: zodUtil.number({
    invalid_type_error: "O valor deve ser um número",
    required_error: "O valor é obrigatorio",
  }),
  descricao: zodUtil
    .string({
      invalid_type_error: "A descricao deve ser uma string",
    })
    .optional(),
  status: zodUtil.enum(
    ["pendente", "pago", "cancelado", "processando", "estornado"],
    {
      invalid_type_error:
        "O status deve ser pendente, recebido, cancelado, processando ou estornado",
      required_error: "O status é obrigatório",
    }
  ),
  metodoPagamento: zodUtil.enum(
    ["pix", "dinheiro", "cartao", "transferencia", "boleto", "cheque"],
    {
      required_error: "O metodoPagamento é obrigatorio",
      invalid_type_error:
        "O metodoPagamento deve ser uma das seguintes opções: (pix, dinheiro, cartao, transferencia, boleto ou cheque)",
    }
  ),
});

const updateVendasPdv = zodUtil.object({
  clienteId: zodUtil
    .number({
      invalid_type_error: "O clienteId deve existir no sistema",
    })
    .optional(),
  vendedorId: zodUtil
    .string({
      invalid_type_error: "O vendedorId deve existir no sistema",
    })
    .optional(),
  valor: zodUtil
    .number({
      invalid_type_error: "O valor deve ser um número",
    })
    .optional(),
  descricao: zodUtil
    .string({
      invalid_type_error: "A descricao deve ser uma string",
    })
    .optional(),
  status: zodUtil
    .enum(["pendente", "pago", "cancelado", "processando", "estornado"], {
      invalid_type_error:
        "O status deve ser pendente, recebido, cancelado, processando ou estornado",
    })
    .optional(),
  metodoPagamento: zodUtil
    .enum(["pix", "dinheiro", "cartao", "transferencia", "boleto", "cheque"], {
      invalid_type_error:
        "O metodoPagamento deve ser uma das seguintes opções: (pix, dinheiro, cartao, transferencia, boleto ou cheque)",
    })
    .optional(),
});

export { createVendasPdv, updateVendasPdv };
