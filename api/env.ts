import zodUtil from "./src/utils/validations/zod_util";
import "dotenv/config";

const envParser = zodUtil.object({
    SECRET: zodUtil.string({
        message: "O SECRET deve ser uma string",
        required_error: "O SECRET é obrigatório",
    }),
    DATABASE_URL: zodUtil.string({
        message: "O DATABASE_URL deve ser uma string",
        required_error: "O DATABASE_URL é obrigatório",
    }),
    PORT: zodUtil.number({
        message: "O PORT deve ser um number",
        required_error: "O PORT é obrigatório",
    }),
});

const env = envParser.safeParse(process.env);

export default env