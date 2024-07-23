## Organiza soft

## Instalação

### Clonando o repositório
- clone o repositório com `git clone https://github.com/antoniosaints/gestor-clientes.git`
- acesse a pasta do repositório clonado

### Frontend
- entre na pasta `/frontend`
- no arquivo `.env`, preencha as variáveis com os dados corretos
- instale as dependências com `npm i`
- rode o build com `npm run build`
- use os arquivos do build na hospedagem

### Backend
- entre na pasta `/api`
- no arquivo `.env` informe as informações corretamente
- instale as dependencias com `npm i`
- com as informações de banco de dados informadas no `.env` corretamente, vamos rodar as migrations e seeds com:
    * rode as migrations com `npm run migrate:deploy`
    * rode as seeds com `npm run seed`
- agora faça o build da aplicação com `npm run build` 
- por fim, rode o backend com `npm start`

### O servidor já deve rodar, o backend roda nas portas definidas por você nos arquivos .env
