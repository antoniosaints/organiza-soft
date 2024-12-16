import dotenv from "dotenv";
import { z } from "zod";
dotenv.config();

const envSchema = z.object({
    DATABASE_URL: z.string({required_error: "DATABASE_URL nao foi informado nas variaveis de ambiente"}),
    BASE_URL_FRONT: z.string({required_error: "BASE_URL_FRONT nao foi informado nas variaveis de ambiente"}),
    BASE_URL: z.string({required_error: "BASE_URL nao foi informado nas variaveis de ambiente"}),
    MINIO_SECRETKEY: z.string({required_error: "MINIO_SECRETKEY nao foi informado nas variaveis de ambiente"}),
    MINIO_ENDPOINT: z.string({required_error: "MINIO_ENDPOINT nao foi informado nas variaveis de ambiente"}),
    MINIO_ACCESSKEY: z.string({required_error: "MINIO_ACCESSKEY nao foi informado nas variaveis de ambiente"}),
    SECRET: z.string({required_error: "SECRET nao foi informado nas variaveis de ambiente"}),
    PORT: z.string({required_error: "PORT nao foi informado nas variaveis de ambiente"}).transform(Number),
    STRIPE_SECRET_KEY: z.string({required_error: "STRIPE_SECRET_KEY nao foi informado nas variaveis de ambiente"}),
    STRIPE_PUBLIC_KEY: z.string({required_error: "STRIPE_PUBLIC_KEY nao foi informado nas variaveis de ambiente"}),
    STRIPE_PRICE_ID: z.string({required_error: "STRIPE_PRICE_ID nao foi informado nas variaveis de ambiente"}),
    STRIPE_WEBHOOK_SECRET: z.string({required_error: "STRIPE_WEBHOOK_SECRET nao foi informado nas variaveis de ambiente"}),
    MERCADOPAGO_SECRETKEY: z.string({required_error: "MERCADOPAGO_SECRETKEY nao foi informado nas variaveis de ambiente"}),
    MERCADOPAGO_PUBLISHKEY: z.string().optional(),
    R2_SECRETKEY: z.string({required_error: "R2_SECRETKEY nao foi informado nas variaveis de ambiente"}),
    R2_ACCESSKEY: z.string({required_error: "R2_ACCESSKEY nao foi informado nas variaveis de ambiente"}),
    R2_ENDPOINT: z.string({required_error: "R2_ENDPOINT nao foi informado nas variaveis de ambiente"}),
    S3_ENPOINT: z.string({required_error: "S3_ENPOINT nao foi informado nas variaveis de ambiente"}),
    S3_REGION: z.string({required_error: "S3_REGION nao foi informado nas variaveis de ambiente"}),
    S3_ACCESSKEY: z.string({required_error: "S3_ACCESSKEY nao foi informado nas variaveis de ambiente"}),
    S3_SECRETKEY: z.string({required_error: "S3_SECRETKEY nao foi informado nas variaveis de ambiente"}),
    EMAIL_HOST: z.string({required_error: "EMAIL_HOST nao foi informado nas variaveis de ambiente"}),
    EMAIL_PORT: z.string({required_error: "EMAIL_PORT nao foi informado nas variaveis de ambiente"}).transform(Number),
    EMAIL_SECURE: z.string({required_error: "EMAIL_SECURE nao foi informado nas variaveis de ambiente"}).transform(Boolean),
    EMAIL_USER: z.string({required_error: "EMAIL_USER nao foi informado nas variaveis de ambiente"}),
    EMAIL_PASSWORD: z.string({required_error: "EMAIL_PASSWORD nao foi informado nas variaveis de ambiente"}),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error(
    "Erro ao validar as variáveis de ambiente:",
    parsedEnv.error.format()
  );
  process.exit(1); // Encerra a aplicação caso as variáveis sejam inválidas
}

const env = parsedEnv.data;

export default env;
