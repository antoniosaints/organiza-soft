import zodUtil from "../../utils/validations/zod_util";

const createUser = zodUtil.object({
    nome: zodUtil.string({
        required_error: "O nome é obrigatório",
        invalid_type_error: "O nome deve ser uma string",
    }),
    email: zodUtil.string({
        required_error: "O email é obrigatório",
        invalid_type_error: "O email deve ser uma string",
    }).email({
        message: "O email deve ser um email válido",
    }).toLowerCase().trim(),
    senha: zodUtil.string({
        required_error: "A senha é obrigatória",
        invalid_type_error: "A senha deve ser uma string",
    }).min(8, {
        message: "A senha deve ter pelo menos 8 caracteres",
    }).trim(),
    telefone: zodUtil.string({
        invalid_type_error: "O telefone deve ser uma string",
    }).optional(),
    regra: zodUtil.string({
        required_error: "A regra é obrigatória",
        invalid_type_error: "A regra deve ser uma string",
    }),
    status: zodUtil.enum(["ativo", "inativo"]).optional(),
    grupoId: zodUtil.number({
        required_error: "O grupoId é obrigatório",
        invalid_type_error: "O grupoId deve ser um number",
    }),
    contaSistemaId: zodUtil.number({
        required_error: "O contaSistemaId é obrigatório",
        invalid_type_error: "O contaSistemaId deve ser um number",
    })
})


const updateUser = zodUtil.object({
    nome: zodUtil.string({
        invalid_type_error: "O nome deve ser uma string",
    }).optional(),
    email: zodUtil.string({
        invalid_type_error: "O email deve ser uma string",
    }).email({
        message: "O email deve ser um email válido",
    }).toLowerCase().trim().optional(),
    senha: zodUtil.string({
        invalid_type_error: "A senha deve ser uma string",
    }).min(8, {
        message: "A senha deve ter pelo menos 8 caracteres",
    }).trim().optional(),
    telefone: zodUtil.string({
        invalid_type_error: "O telefone deve ser uma string",
    }).optional(),
    regra: zodUtil.string({
        invalid_type_error: "A regra deve ser uma string",
    }).optional(),
    status: zodUtil.enum(["ativo", "inativo"]).optional(),
    grupoId: zodUtil.number({
        invalid_type_error: "O grupoId deve ser um number",
    }).optional(),
    contaSistemaId: zodUtil.number({
        invalid_type_error: "O contaSistemaId deve ser um number",
    }).optional()
})

export {
    createUser,
    updateUser
}