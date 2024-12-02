import zodUtil from "../../utils/validations/zod_util";
import { createTransacao } from "./transacao_schema";

const LancamentoBodySchema = zodUtil.object({
  contaSistemaId: zodUtil
    .number({
      required_error: "O contaSistemaId é obrigatorio",
      invalid_type_error: "O contaSistemaId deve ser um número",
    })
    .int("O contaSistemaId deve ser um inteiro"),
  lancamento: zodUtil.lazy(() => createTransacao, {
    description: "A transacao deve ser uma transacao",
  }),
  periodo: zodUtil.enum(["semana", "mes", "ano"], {
    required_error: "O periodo é obrigatorio",
    invalid_type_error:
      "O periodo deve ser uma das seguintes opções: (semana, mes ou ano)",
  }),
  valorEntrada: zodUtil.number({
    required_error: "O valorEntrada é obrigatorio",
    invalid_type_error: "O valorEntrada deve ser um número",
  }),
  isParcelado: zodUtil
    .boolean({
      required_error: "O isParcelado é obrigatorio",
      invalid_type_error: "O isParcelado deve ser um booleano",
    })
    .default(false),
  quantidadeParcelas: zodUtil
    .number({
      required_error: "A quantidadeParcelas é obrigatorio",
      invalid_type_error: "A quantidadeParcelas deve ser um número",
    })
    .default(1),
  dataEntrada: zodUtil
    .string({
      required_error: "A dataEntrada é obrigatorio",
      invalid_type_error: "A dataEntrada deve ser uma string",
    })
    .transform((val) => new Date(val))
    .default(() => new Date().toISOString())
    .optional(),
  dataPagamento: zodUtil
    .string({
      invalid_type_error: "A dataPagamento deve ser uma string",
    })
    .transform((val) => new Date(val))
    .default(() => new Date().toISOString()),
  dataPrimeiraParcela: zodUtil
    .string({
      invalid_type_error: "A dataPrimeiraParcela deve ser uma string",
    })
    .transform((val) => new Date(val))
    .default(() => new Date().toISOString()),
  isEfetivado: zodUtil
    .boolean({
      required_error: "O isEfetivado é obrigatorio",
      invalid_type_error: "O isEfetivado deve ser um booleano",
    })
    .default(false),
  hasEntrada: zodUtil
    .boolean({
      required_error: "O hasEntrada é obrigatorio",
      invalid_type_error: "O hasEntrada deve ser um booleano",
    })
    .default(false),
  valorLancamento: zodUtil
    .number({
      required_error: "O valorLancamento é obrigatorio",
      invalid_type_error: "O valorLancamento deve ser um número",
    })
    .refine((val) => val >= 0, {
      message: "O valorLancamento deve ser positivo",
    }),
});

export { LancamentoBodySchema };
