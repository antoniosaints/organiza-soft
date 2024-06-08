## Ponto ideal

## Instalação

### Frontend
- clone o repositório e entre no frontend
- instale as dependências com `npm i`
- rode o build com `npm run build`
- use os arquivos do build na hospedagem

### Backend
* DOCKER
    * rode o comando `docker-compose up -d` dentro da pasta do backend
    * acesse o terminal do container aplication e rode `composer db:init`
    * no arquivo `phinx.json` defina as configs do banco de dados
    * rode as migrations com `composer migrate:up`
    * rode as seeds com `composer seed:up`

* Server Apache
    * instale as dependências com `composer install`
    * rode o comando `composer db:init`
    * defina as configs no arquivo `phinx.json`
    * rode as migrations `composer migrate:up`
    * rode as seeds com `composer seed:up`

### O servidor já deve rodar, o backend roda nas portas 8443 e 8090 no docker
