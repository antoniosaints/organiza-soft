## Organiza soft

## Instalação
### O Sistema roda sob o NODEJS 20.18.0, use a mesma versão para evitar incompatibilidades

### Clonando o repositório
- Crie uma pasta para o projeto e entre nela
- clone o repositório com `git clone https://github.com/antoniosaints/organiza-soft.git ./`
- siga os passos abaixo

### Frontend
- entre na pasta `/vue`
- no arquivo `.env`, preencha as variáveis com os dados corretos
- instale as dependências com `npm i`
- rode em desenvolvimento com `npm run dev`
- o frontend vai subir na porta definida nas variaveis de ambiente `.env` da pasta `/vue`

### Backend
- entre na pasta `/api`
- no arquivo `.env` informe as informações corretamente
- instale as dependencias com `npm i`
- com as informações de banco de dados informadas no `.env` corretamente, vamos rodar as migrations e seeds com:
    * rode as migrations em desenvolvimento com `npm run migrate:dev`
    * rode as seeds com `npm run seed`
- agora rode a api em desenvolvimento com `npm run dev` 
- a api deve estar rodando na porta definida nas variáveis de ambiente `.env` da pasta `/api`

### Você ja deve conseguir acessar a aplicação em `http://localhost:(porta definida no .env da pasta vue)`

## Para hospedar o projeto, você deve realizar o build de ambas as partes do projeto e colocar em um servidor NGinx com NodeJS!

![dash](https://github.com/user-attachments/assets/c4f66bc8-bf68-445f-b144-2631af12fa2a)
![ai](https://github.com/user-attachments/assets/9f0f563e-bbf3-4922-aa0a-305e7cb3d044)
![pdv](https://github.com/user-attachments/assets/46aef8d1-4255-49e8-80d2-267995a2e19d)
