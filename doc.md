# Projeto Labook-Backend

## Resumo

#### A API labook-backend tem a finalidade de se comunicar com um banco de dados através dos seus respectivos endpoint, ela simula uma rede social, onde qualquer pessoa pode se cadastrar, criar post e interagir em posts de outros usuários.

## Como rodar a API

1. ##### Clone
    - Comandos
```bash
    # Clone este repositório
    $ git clone https://github.com/WeslleiBrito/projeto-labook-backend.git    
```

2. ##### Configurando o arquivo env
    1. Crie na raiz do projeto (projeto-labook-backend/) um arquivo chamado [.env]
    2. Existe um arquivo na raiz do projeto (projeto-labook-backend/) chamado "env.exemplo", nele encontram-se todas as variáveis de ambiente, copie todas elas e cole dentro do arquivo ".env" que foi criado no passo número 1.
    3. Você notará que apenas uma variável não tem um valor, essa variável é a "JWT_KEY", ela guarda a senha para criar as encriptação dos tokens. Crie uma senha forte e atribua a "JWT_KEY".

3. ##### Criação e configuração do banco de dados
    1. Crie um arquivo chamado "database.db" dentro da pasta "projeto-labook-backend/src/database", caso não exista esse arquivo.
    2. Conecte-se ao banco [recomendo o uso da extensão MySQL da Weijan Chen]
    3. Todas as querys de criação das tabelas estão no arquivo "database.sql", rode/execute todas elas. 

4. ##### Instalando as dependências e rodando a API

    - Comandos
```bash
    # Execute esses comandos dentro da pasta (projeto-labook-backend/)

    # Instalação das dependências
    $ npm install

    # Executando a aplicação
    $ npm run dev
```
## Tecnologias Utilizadas

1. [Node Js](https://nodejs.org/pt-br/docs)
2. [Typescript](https://www.typescriptlang.org/pt/docs/handbook/typescript-in-5-minutes.html)
3. [Express](https://expressjs.com/pt-br/)
4. [Cors](https://developer.mozilla.org/pt-BR/docs/Glossary/CORS)
5. [Sqlite3](https://www.sqlite.org/docs.html)
6. [Knex](https://knexjs.org/guide/query-builder.html)
7. [dotenv](https://www.npmjs.com/package/dotenv)
8. [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
9. [uuid](https://www.npmjs.com/package/uuid)
9. [zod](https://zod.dev/)

## Documentação Postman
#### [Link documentação]()

## Funcionalidades
### Signup
Cria um novo usuário
*Dados obrigatórios:* [post] http://localhost:3003/users/signup
```json
    body: {
        "name": "string",
        "email": "string",
        "password": "string"
    }
 ```
 ![Signup](./src/other/prints/Screenshot%202023-08-23%20212253.png)
    