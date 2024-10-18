# Estágio 1: Compilação da aplicação
FROM node:18 AS builder
WORKDIR /app

# Definir ARGs para o build (passados via docker-compose.yml)
ARG DATABASE_URL
ARG SECRET
ARG BASE_URL_FRONT
ARG STRIPE_SECRET_KEY
ARG STRIPE_PUBLIC_KEY
ARG STRIPE_WEBHOOK_SECRET
ARG PORT
ARG TZ

# Instalar as dependências do projeto
COPY package*.json ./
RUN npm install

# Copiar o restante dos arquivos e compilar o TypeScript
COPY . .
RUN npx prisma generate
RUN npm run migrate:deploy
RUN npm run seed
RUN npm run build

# Estágio 2: Rodar a aplicação em produção
FROM node:18
WORKDIR /app

# Copiar apenas os arquivos necessários para rodar a aplicação
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma 

# Definir variáveis de ambiente no contêiner
ENV DATABASE_URL=$DATABASE_URL
ENV SECRET=$SECRET
ENV BASE_URL_FRONT=$BASE_URL_FRONT
ENV STRIPE_SECRET_KEY=$STRIPE_SECRET_KEY
ENV STRIPE_PUBLIC_KEY=$STRIPE_PUBLIC_KEY
ENV STRIPE_WEBHOOK_SECRET=$STRIPE_WEBHOOK_SECRET
ENV PORT=$PORT
ENV TZ=$TZ

# Expõe a porta definida
EXPOSE $PORT

# Rodar a aplicação
CMD ["node", "dist/app.js"]
