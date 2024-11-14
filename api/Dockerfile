# Usa a imagem Node.js 18
FROM node:18

# Define o diretório de trabalho no container
WORKDIR /app

# Copia o arquivo package.json e package-lock.json para o container
COPY package*.json ./

# Instala as dependências
RUN npm install

# Declaração de argumentos para receber as envs
ARG PORT=5000

# Passar as variáveis para o ambiente de build
ENV PORT=$PORT

# Copia o restante dos arquivos para o container
COPY . .

# Expo
EXPOSE $PORT

# Define o comando para rodar as migrações, seeds e iniciar a aplicação
CMD npm run migrate:deploy && npm run seed && npm run dev
