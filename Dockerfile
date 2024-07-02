# Usar a imagem base oficial do Node.js com Alpine
FROM node:18-alpine

# Definir o diretório de trabalho para a aplicação API
WORKDIR /app/api

# Copiar package.json e package-lock.json para o diretório de trabalho
COPY ./api/package*.json ./

# Instalar as dependências da API
RUN npm install

# Copiar o restante do código da API
COPY ./api ./

# Definir o diretório de trabalho para a aplicação frontend
WORKDIR /app/frontend

# Copiar package.json e package-lock.json para o diretório de trabalho
COPY ./frontend/package*.json ./

# Instalar as dependências do frontend
RUN npm install

# Copiar o restante do código do frontend
COPY ./frontend ./

# Expor as portas usadas pelas aplicações
EXPOSE 5000 3002