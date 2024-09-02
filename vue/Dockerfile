# Dockerfile para o frontend
FROM node:18-alpine

# Definir diretório de trabalho dentro do container
WORKDIR /app

# Copiar package.json e package-lock.json
COPY package*.json ./

# Instalar dependências
RUN npm install

# Copiar o restante do código da aplicação
COPY . .

# Compilar a aplicação Vue.js
RUN npm run build

# Expor a porta que o servidor do frontend vai rodar
EXPOSE 8080

# Comando para iniciar o servidor
CMD ["npm", "run", "dev"]
