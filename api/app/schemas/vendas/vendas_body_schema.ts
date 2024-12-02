import zodUtil from "../../utils/validations/zod_util";

const itemSchema = zodUtil.object({
  id: zodUtil.number(),
  produto: zodUtil.string({
    invalid_type_error: "O nome do produto deve ser uma string",
    required_error: "O nome do produto é obrigatorio",
  }),
  quantidade: zodUtil.number().min(1).default(1),
  preco: zodUtil
    .number({
      invalid_type_error: "O preco deve ser um number",
      required_error: "O preco é obrigatorio",
    })
    .positive("O preco deve ser maior que 0"),
});

const VendaBodySchema = zodUtil.object({
  contaSistemaId: zodUtil
    .number({
      required_error: "O contaSistemaId é obrigatorio",
      invalid_type_error: "O contaSistemaId deve ser um número",
    })
    .int("O contaSistemaId deve ser um inteiro"),
  itens: zodUtil
    .array(itemSchema, {
      invalid_type_error: "Os itens devem ser um array",
      required_error: "Os itens são obrigatorio",
    })
    .min(1, "O carrinho deve ter pelo menos um item"),
  formaPagamento: zodUtil.enum(
    ["pix", "dinheiro", "cartao", "transferencia", "boleto", "cheque"],
    {
      errorMap: () => ({
        message:
          "a formaPagamento deve ser pix, dinheiro, cartao, transferencia, boleto ou cheque",
      }),
    }
  ),
  descricao: zodUtil.string().optional(),
  cliente: zodUtil.number({
    invalid_type_error: "O cliente deve ser um number",
    required_error: "O cliente é obrigatorio",
  }),
  vendedor: zodUtil.number({
    invalid_type_error: "O vendedor deve ser um number",
    required_error: "O vendedor é obrigatorio",
  }),
  vendaGateway: zodUtil
    .boolean({
      invalid_type_error: "O gateway deve ser true ou false",
    })
    .default(false)
    .optional(),
  desconto: zodUtil.number().min(0).max(1).default(0).optional(),
});

export { VendaBodySchema };
