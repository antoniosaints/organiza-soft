import zodUtil from "../../utils/validations/zod_util";

const ICanaisVenda = zodUtil.enum([
  "email",
  "telefone",
  "whatsapp",
  "instagram",
  "facebook",
  "twitter",
  "telegram",
  "sms",
  "chat",
  "linkedin",
  "skype",
  "correio",
  "outro",
]);

const dateTransformer = zodUtil
  .union([zodUtil.string(), zodUtil.date()], {
    invalid_type_error: "O valor deve ser uma string ou uma data válida.",
  })
  .nullable()
  .optional()
  .transform((val) => (typeof val === "string" ? new Date(val) : val));

const createCliente = zodUtil.object({
  nome: zodUtil.string({
    required_error: "O nome é obrigatório",
    invalid_type_error: "O nome deve ser uma string",
  }),
  email: zodUtil
    .string({
      required_error: "O email é obrigatório",
      invalid_type_error: "O email deve ser uma string",
    })
    .email({
      message: "O email deve ser um email válido",
    })
    .toLowerCase()
    .trim(),
  telefone: zodUtil.string({
    invalid_type_error: "O telefone deve ser uma string",
  }).nullable().optional(),
  telefoneAlternativo: zodUtil.string({
    invalid_type_error: "O telefone alternativo deve ser uma string",
  }).nullable().optional(),
  cpfCnpj: zodUtil.string({
    invalid_type_error: "O CPF/CNPJ deve ser uma string",
  }).nullable().optional(),
  endereco: zodUtil.string({
    invalid_type_error: "O endereço deve ser uma string",
  }).nullable().optional(),
  tipoCliente: zodUtil.enum(["fisica", "juridica"], {
    invalid_type_error: "O tipo de cliente deve ser 'fisica' ou 'juridica'",
  }).optional(),
  instagram: zodUtil.string({
    invalid_type_error: "O Instagram deve ser uma string",
  }).nullable().optional(),
  site: zodUtil.string({
    invalid_type_error: "O site deve ser uma string",
  }).nullable().optional(),
  canalPreferidoContato: ICanaisVenda.optional(),
  cep: zodUtil.string({
    invalid_type_error: "O CEP deve ser uma string",
  }).nullable().optional(),
  estado: zodUtil.string({
    invalid_type_error: "O Estado deve ser uma string",
  }).nullable().optional(),
  latitudeLongitude: zodUtil.string({
    invalid_type_error: "A latitudeLongitude deve ser uma string separada por virgula",
  }).nullable().optional(),
  cidade: zodUtil.string({
    invalid_type_error: "A cidade deve ser uma string",
  }).nullable().optional(),
  pais: zodUtil.string({
    invalid_type_error: "O país deve ser uma string",
  }).nullable().optional(),
  saldoDevedor: zodUtil.number({
    invalid_type_error: "O saldo devedor deve ser um número",
  }).nullable().optional(),
  limiteCredito: zodUtil.number({
    invalid_type_error: "O limite de crédito deve ser um número",
  }).nullable().optional(),
  segmento: zodUtil.string({
    invalid_type_error: "O segmento deve ser uma string",
  }).nullable().optional(),
  scoreFinanceiro: zodUtil.number({
    invalid_type_error: "O score financeiro deve ser um número",
  }).nullable().optional(),
  dataBloqueio: dateTransformer,
  dataUltimaCompra: dateTransformer,
  contaSistemaId: zodUtil.number({
    required_error: "O contaSistemaId é obrigatório",
    invalid_type_error: "O contaSistemaId deve ser um número",
  }),
});

const updateCliente = zodUtil.object({
  nome: zodUtil.string({
    invalid_type_error: "O nome deve ser uma string",
  }).optional(),
  email: zodUtil.string({
    invalid_type_error: "O email deve ser uma string",
  }).optional(),
  status: zodUtil.enum(["ativo", "inativo"], {
    invalid_type_error: "O status deve ser 'ativo' ou 'inativo'",
  }).optional(),
  telefone: zodUtil.string({
    invalid_type_error: "O telefone deve ser uma string",
  }).nullable().optional(),
  telefoneAlternativo: zodUtil.string({
    invalid_type_error: "O telefone alternativo deve ser uma string",
  }).nullable().optional(),
  cpfCnpj: zodUtil.string({
    invalid_type_error: "O CPF/CNPJ deve ser uma string",
  }).nullable().optional(),
  endereco: zodUtil.string({
    invalid_type_error: "O endereço deve ser uma string",
  }).nullable().optional(),
  tipoCliente: zodUtil.enum(["fisica", "juridica"], {
    invalid_type_error: "O tipo de cliente deve ser 'fisica' ou 'juridica'",
  }).optional(),
  instagram: zodUtil.string({
    invalid_type_error: "O Instagram deve ser uma string",
  }).nullable().optional(),
  site: zodUtil.string({
    invalid_type_error: "O site deve ser uma string",
  }).nullable().optional(),
  canalPreferidoContato: ICanaisVenda.optional(),
  cep: zodUtil.string({
    invalid_type_error: "O CEP deve ser uma string",
  }).nullable().optional(),
  estado: zodUtil.string({
    invalid_type_error: "O Estado deve ser uma string",
  }).nullable().optional(),
  latitudeLongitude: zodUtil.string({
    invalid_type_error: "A latitudeLongitude deve ser uma string separada por virgula",
  }).nullable().optional(),
  cidade: zodUtil.string({
    invalid_type_error: "A cidade deve ser uma string",
  }).nullable().optional(),
  pais: zodUtil.string({
    invalid_type_error: "O país deve ser uma string",
  }).nullable().optional(),
  saldoDevedor: zodUtil.number({
    invalid_type_error: "O saldo devedor deve ser um número",
  }).nullable().optional(),
  limiteCredito: zodUtil.number({
    invalid_type_error: "O limite de crédito deve ser um número",
  }).nullable().optional(),
  segmento: zodUtil.string({
    invalid_type_error: "O segmento deve ser uma string",
  }).nullable().optional(),
  scoreFinanceiro: zodUtil.number({
    invalid_type_error: "O score financeiro deve ser um número",
  }).nullable().optional(),
  dataBloqueio: dateTransformer,
  dataUltimaCompra: dateTransformer
});

export { createCliente, updateCliente };
