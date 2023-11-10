Primeiros passos para inicializar a execução do projeto da aula 24

Baixar os dois projetos do repositório do github da EBAC

Projeto 1 - https://github.com/EBAC-QE/ebac-demo-store-server

Projeto 2 - https://github.com/EBAC-QE/ebac-demo-store-admin

Na pasta Modulo_24, use o comando git clone

git clone https://github.com/EBAC-QE/ebac-demo-store-server

git clone https://github.com/EBAC-QE/ebac-demo-store-admin

Instale o nvm na máquina (node version manager) para usar o node 18 (antigo, mas ainda compatível com o projeto)
Dá pra usar o mais atual, versão 20, mas funcionou com a versão 18

https://www.freecodecamp.org/news/node-version-manager-nvm-install-guide/

Após isso, instale a versão 18 do node.

Instale o docker

1 - Abra o projeto ebac-demo-store-server

Instale os pacotes

- Instal Yarn: npm install -g yarn

- Install dependencies: yarn install

- Generate Prisma client: npm run prisma:generate

- Start database in Docker: npm run docker:db

- Initiate the database: npm run db:init

- Start the server: yarn start

Se der pau na instalação, então use o comando que ele provê de instalar legacy

Abra o navegador no link http://localhost:3000/api#/

2 - Abra o projeto ebac-demo-store-admin

Roda o comando npm install ou yarn install


Para os outros projetos, use as bibliotecas sem a mesma versão da aula, estão desatualizadas. É só remover o ^0.0.1 (exemplo)

-- Iniciar o projeto ebac-demo-store-admin: NODE_OPTIONS=--openssl-legacy-provider yarn start
-- Iniciar o outro projeto: yarn start
-- Executar o teste de contrato: yarn start




