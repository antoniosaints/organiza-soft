import { generateUniqueIdWithPrefix } from "../../utils/tools/UniqueId";
import zodUtil from "../../utils/validations/zod_util";
import { createParcelamento } from "./parcelamento_schema";

const createTransacao = zodUtil.object({
  codigoLancamento: zodUtil
    .string({
      invalid_type_error: "O codigoLancamento deve ser uma string",
      required_error: "O codigoLancamento é obrigatorio",
    })
    .default(() => generateUniqueIdWithPrefix("lcm")),
  valor: zodUtil
    .number({
      invalid_type_error: "O valor deve ser um number",
    })
    .optional(),
  descricao: zodUtil.string({
    invalid_type_error: "A descrição deve ser uma string",
    required_error: "A descrição é obrigatória",
  }),
  categoriaId: zodUtil.number({
    required_error: "A categoriaId é obrigatória",
    invalid_type_error: "s categoriaId deve ser um number",
  }),
  fornecedorId: zodUtil
    .any({
      invalid_type_error: "O fornecedorId deve ser um number",
    })
    .optional(),
  contaId: zodUtil.number({
    required_error: "O contaId é obrigatório",
    invalid_type_error: "O contaId deve ser um number",
  }),
  dataEfetivado: zodUtil
    .string({
      invalid_type_error: "A dataEfetivado deve ser uma data",
    })
    .transform((val) => new Date(val))
    .optional(),
  dataPagamento: zodUtil
    .string({
      invalid_type_error: "A dataPagamento deve ser uma data",
    })
    .transform((val) => new Date(val))
    .optional(),
  dataVencimento: zodUtil
    .string({
      invalid_type_error: "A dataVencimento deve ser uma data",
      required_error: "A dataVencimento é obrigatória",
    })
    .default(() => new Date().toISOString())
    .transform((val) => new Date(val)),
  usuarioEfetivou: zodUtil
    .number({
      invalid_type_error: "O usuarioEfetivou deve ser um number",
    })
    .optional(),
  usuarioLancamento: zodUtil.number({
    invalid_type_error: "O usuarioLancamento deve ser um number",
    required_error: "O usuarioLancamento é obrigatório",
  }),
  metodoPagamento: zodUtil
    .enum(["pix", "dinheiro", "cartao", "transferencia", "boleto", "cheque"], {
      required_error: "O metodoPagamento é obrigatorio",
      invalid_type_error:
        "O metodoPagamento deve ser uma das seguintes opções: (pix, dinheiro, cartao, transferencia, boleto ou cheque)",
    })
    .default("dinheiro")
    .optional(),
  natureza: zodUtil.enum(["receita", "despesa"], {
    invalid_type_error: "A natureza deve ser receita ou despesa",
    required_error: "A natureza é obrigatória",
  }),
  operacao: zodUtil
    .enum(["entrada", "saida", "transferencia", "ajuste"], {
      required_error: "A operação é obrigatória",
      invalid_type_error:
        "A operação deve ser entrada, saida, transferencia ou ajuste",
    })
    .default("entrada"),
  parcelado: zodUtil
    .enum(["sim", "nao"], {
      invalid_type_error: "O parcelado deve ser sim ou não",
    })
    .optional(),
  status: zodUtil
    .enum(["pendente", "recebido", "cancelada"], {
      invalid_type_error: "O status deve ser pendente, recebido ou cancelada",
    })
    .default("pendente")
    .optional(),
  valorFinal: zodUtil
    .number({
      invalid_type_error: "O valorFinal deve ser um number",
    })
    .optional(),
  contaSistemaId: zodUtil
    .number({
      invalid_type_error: "O contaSistemaId deve ser um number",
    })
    .default(1),
  codigoNfe: zodUtil
    .string({
      invalid_type_error: "O codigoNfe deve ser uma string",
    })
    .optional(),
  referenciaExterna: zodUtil
    .string({
      invalid_type_error: "A referenciaExterna deve ser uma string",
    })
    .optional(),
  codigo_servico: zodUtil
    .string({
      invalid_type_error: "O codigo_servico deve ser uma string",
    })
    .optional(),
  taxaJuros: zodUtil
    .number({
      invalid_type_error: "A taxaJuros deve ser um number",
    })
    .default(0)
    .refine((val) => val >= 0, { message: "A taxaJuros deve ser positiva" })
    .optional(),
  desconto: zodUtil
    .number({
      invalid_type_error: "O desconto deve ser um number",
    })
    .optional(),
  taxaDesconto: zodUtil
    .number({
      invalid_type_error: "A taxaDesconto deve ser um number",
    })
    .default(0)
    .refine((val) => val >= 0, { message: "A taxaDesconto deve ser positiva" })
    .optional(),
  juros: zodUtil
    .number({
      invalid_type_error: "O juros deve ser um number",
    })
    .optional(),
  moeda: zodUtil
    .string({
      invalid_type_error: "A moeda deve ser uma string",
    })
    .optional(),
  taxaCambio: zodUtil
    .number({
      invalid_type_error: "A taxaCambio deve ser um number",
    })
    .default(0)
    .refine((val) => val >= 0, { message: "A taxaCambio deve ser positiva" })
    .optional(),
  FinanceiroParcelamento: zodUtil
    .array(createParcelamento)
    .optional(),
});

const updateTransacao = zodUtil.object({
  codigoLancamento: zodUtil
    .string({
      invalid_type_error: "O codigoLancamento deve ser uma string",
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
  categoriaId: zodUtil
    .number({
      invalid_type_error: "s categoriaId deve ser um number",
    })
    .optional(),
  fornecedorId: zodUtil
    .number({
      invalid_type_error: "O fornecedorId deve ser um number",
    })
    .optional(),
  contaId: zodUtil
    .number({
      invalid_type_error: "O contaId deve ser um number",
    })
    .optional(),
  dataEfetivado: zodUtil
    .string({
      invalid_type_error: "A dataEfetivado deve ser uma data",
    })
    .transform((val) => new Date(val))
    .optional(),
  dataPagamento: zodUtil
    .string({
      invalid_type_error: "A dataPagamento deve ser uma data",
    })
    .transform((val) => new Date(val))
    .optional(),
  dataVencimento: zodUtil
    .string({
      invalid_type_error: "A dataVencimento deve ser uma data",
      required_error: "A dataVencimento é obrigatória",
    })
    .transform((val) => new Date(val))
    .optional(),
  usuarioEfetivou: zodUtil
    .number({
      invalid_type_error: "O usuarioEfetivou deve ser um number",
    })
    .optional(),
  metodoPagamento: zodUtil
    .enum(["pix", "dinheiro", "cartao", "transferencia", "boleto", "cheque"], {
      required_error: "O metodoPagamento é obrigatorio",
      invalid_type_error:
        "O metodoPagamento deve ser uma das seguintes opções: (pix, dinheiro, cartao, transferencia, boleto ou cheque)",
    })
    .default("dinheiro")
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
    .default("pendente")
    .optional(),
  valorFinal: zodUtil
    .number({
      invalid_type_error: "O valorFinal deve ser um number",
    })
    .optional(),
  codigoNfe: zodUtil
    .string({
      invalid_type_error: "O codigoNfe deve ser uma string",
    })
    .optional(),
  referenciaExterna: zodUtil
    .string({
      invalid_type_error: "A referenciaExterna deve ser uma string",
    })
    .optional(),
  codigo_servico: zodUtil
    .string({
      invalid_type_error: "O codigo_servico deve ser uma string",
    })
    .optional(),
  taxaJuros: zodUtil
    .number({
      invalid_type_error: "A taxaJuros deve ser um number",
    })
    .default(0)
    .refine((val) => val >= 0, { message: "A taxaJuros deve ser positiva" })
    .optional(),
  desconto: zodUtil
    .number({
      invalid_type_error: "O desconto deve ser um number",
    })
    .optional(),
  taxaDesconto: zodUtil
    .number({
      invalid_type_error: "A taxaDesconto deve ser um number",
    })
    .default(0)
    .refine((val) => val >= 0, { message: "A taxaDesconto deve ser positiva" })
    .optional(),
  juros: zodUtil
    .number({
      invalid_type_error: "O juros deve ser um number",
    })
    .optional(),
  moeda: zodUtil
    .string({
      invalid_type_error: "A moeda deve ser uma string",
    })
    .optional(),
  taxaCambio: zodUtil
    .number({
      invalid_type_error: "A taxaCambio deve ser um number",
    })
    .default(0)
    .refine((val) => val >= 0, { message: "A taxaCambio deve ser positiva" })
    .optional(),
});

export { createTransacao, updateTransacao };
