# Usa a imagem Node.js 18
FROM node:18

# Define o diretório de trabalho no container
WORKDIR /app

# Copia o arquivo package.json e package-lock.json para o container
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia o restante dos arquivos para o container
COPY . .
EXPOSE 5000

# Define o comando para rodar as migrações, seeds e iniciar a aplicação
CMD npm run migrate:dev && npm run seed && npm run dev
