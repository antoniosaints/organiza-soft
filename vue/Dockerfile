# Estágio 1: Compilação da aplicação com Vite
FROM node:18 AS builder
WORKDIR /app

# Definir ARGs para o build
ARG VITE_PORT
ARG VITE_BASE_URL_BACKEND
ARG VITE_OPENAI_API_KEY

# Instalar as dependências do projeto
COPY package*.json ./
RUN npm install

# Copiar o restante dos arquivos e compilar
COPY . .

# Passar as variáveis de ambiente para o processo de build do Vite
ENV VITE_PORT=$VITE_PORT
ENV VITE_BASE_URL_BACKEND=$VITE_BASE_URL_BACKEND
ENV VITE_OPENAI_API_KEY=$VITE_OPENAI_API_KEY

# Executar o build da aplicação
RUN npm run build

# Estágio 2: Servir a aplicação estática com Nginx
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html

# Expor a porta do front-end
EXPOSE $VITE_PORT
