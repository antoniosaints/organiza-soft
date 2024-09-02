# Dockerfile para o backend
FROM node:18-alpine

# Definir diretório de trabalho dentro do container
WORKDIR /app

# Copiar package.json e package-lock.json
COPY package*.json ./

# Instalar dependências
RUN npm install
RUN npm run migrate:deploy
RUN npm run seed

# Copiar o restante do código da aplicação
COPY . .

# Compilar TypeScript
RUN npm run build

# Expor a porta que o Node.js vai rodar
EXPOSE 3000

# Comando para iniciar o servidor
CMD ["npm", "start"]
