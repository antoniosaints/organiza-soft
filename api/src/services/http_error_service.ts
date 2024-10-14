import { PrismaClientKnownRequestError, PrismaClientValidationError } from "@prisma/client/runtime/library";
import { NotFoundError, ValidationError } from "../utils/http/lancar_erro";

const errosPrisma: any = {
    P2025: "Registro não encontrado",
    P2002: "Já existe um registro salvo com esses valores",
    P1000: "Erro de autenticação entre o banco de dados e o servidor",
    P1001: "Não é possível acessar o servidor de banco de dados",
    P1002: "O servidor de banco de dados atindo o limite de tentativas de autenticação",
    P1003: "O banco de dados não existe",
    P1009: "O banco já existe"
}
class HttpErrorService {
    static hadle(error: any, response: any) {
        if (error instanceof ValidationError) {
            response.status(400).json({ error: 'Erro de validação', message: error.message });
        } else if (error instanceof NotFoundError) {
            response.status(404).json({ error: 'Não encontrado', message: error.message });
        } else if (error instanceof PrismaClientKnownRequestError) {
            if (error.code) {
                response.status(404).json({ error: 'Não encontrado', message: errosPrisma[error.code] });
            } else {
                response.status(400).json({ error: 'Erro do Prisma', message: error.message });
            }
        } else if (error instanceof PrismaClientValidationError) {
            response.status(400).json({ error: 'Erro de validação do Prisma', message: error.message });
        } else {
            response.status(500).json({ error: 'Erro interno do servidor', message: error.message });
        }
    }
}

export default HttpErrorService;