# Estágio 1: Compilação da aplicação com Vite
FROM node:18 AS builder

# Definir o diretório de trabalho
WORKDIR /app

# Copiar apenas arquivos de dependência para otimizar cache
COPY package*.json ./

# Instalar dependências
RUN npm install

# Declaração de argumentos para receber as envs
ARG VITE_BASE_URL_BACKEND

# Passar as variáveis para o ambiente de build
ENV VITE_BASE_URL_BACKEND=$VITE_BASE_URL_BACKEND

# Copiar o restante dos arquivos da aplicação
COPY . .

# Executar o build da aplicação para produção
RUN npm run build

# Estágio 2: Servir a aplicação estática com Nginx
FROM nginx:alpine

# Copiar os arquivos estáticos da pasta de build gerada no estágio 1 para o Nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Copiar o arquivo de configuração do Nginx
COPY nginx.conf /etc/nginx/nginx.conf

# Expor a porta padrão HTTP
EXPOSE 80

# Comando para iniciar o Nginx no container
CMD ["nginx", "-g", "daemon off;"]
