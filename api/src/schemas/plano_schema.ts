import zodUtil from "../utils/validations/zod_util";
import { createAssinatura as assinatura } from "./assinatura_schema";
const createPlano = zodUtil.object({
  id: zodUtil.number({
    required_error: "O id é obrigatório",
    invalid_type_error: "O id deve ser um number",
  }),
  nome: zodUtil.string({
    required_error: "O nome é obrigatório",
    invalid_type_error: "O nome deve ser uma string",
  }),
  descricao: zodUtil.string({
    invalid_type_error: "A descricao deve ser uma string",
  }).optional(), 
  preco: zodUtil.number({
    required_error: "O preco é obrigatório",
    invalid_type_error: "O preco deve ser um number",
  }),
  cor: zodUtil.string({
    required_error: "A cor é obrigatória",
    invalid_type_error: "A cor deve ser uma string",
  }),
  dataCriacao: zodUtil.string({
    required_error: "A dataCriacao é obrigatória",
    invalid_type_error: "A dataCriacao deve ser uma string",
  }), 
  dataAtualizacao: zodUtil.string({
    invalid_type_error: "A dataAtualizacao deve ser uma string",
  }).optional(),
  assinatura: zodUtil.array(assinatura, {
    required_error: "Assinatura é obrigatorio",
  }),
});

const updatePlano = zodUtil.object({
  id: zodUtil.number({
    invalid_type_error: "O id deve ser um number",
  }).optional(),
  nome: zodUtil.string({
    invalid_type_error: "O nome deve ser uma string",
  }).optional(),
  descricao: zodUtil.string({
    invalid_type_error: "A descricao deve ser uma string",
  }).optional(),
  preco: zodUtil.number({
    invalid_type_error: "O preco deve ser um number",
  }).optional(),
  cor: zodUtil.string({
    invalid_type_error: "A cor deve ser uma string",
  }).optional(),
  dataCriacao: zodUtil.string({
    invalid_type_error: "A dataCriacao deve ser uma string",
  }).optional(),
  dataAtualizacao: zodUtil.string({
    invalid_type_error: "A dataAtualizacao deve ser uma string",
  }).optional(),
});

export {
  createPlano,
  updatePlano
};
