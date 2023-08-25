# Documentação da API

## Sumário de Navegação
1. [Resumo](#resumo)
2. [Executando a API](#executando-a-api)
3. [Detalhes do Servidor](#detalhes-do-servidor)
4. [Autenticação](#autenticação)
5. [Endpoints](#endpoints)
5.1 [POST/signup](#1-post-signup)
5.2 [POST /login](#2-post-login)
5.3 [POST /create-post](#3-post-create-post)
5.4 []
## Resumo
Bem-vindo à documentação da API do Labook! A API labook-backend foi projetada para fornecer um ambiente de comunicação com um banco de dados por meio de seus endpoints exclusivos. Inspirada no conceito de rede social, esta API permite que qualquer pessoa se cadastre, crie posts e interaja com as publicações de outros usuários de forma intuitiva e segura.


---

## Executando a API

Aqui está um guia passo a passo para executar a API do projeto Labook:

### 1. Clonando o Repositório

Clone este repositório para o seu ambiente local:

```bash
# Clone este repositório
$ git clone https://github.com/WeslleiBrito/projeto-labook-backend.git
```

### 2. Configurando o Arquivo .env

1. Na raiz do projeto (`projeto-labook-backend/`), crie um arquivo chamado `.env`.
2. Abra o arquivo `env.exemplo` que está na raiz do projeto e copie todas as variáveis de ambiente.
3. Cole as variáveis de ambiente no arquivo `.env` que você criou.
4. Configure a variável `JWT_KEY` com uma senha forte para encriptação de tokens.

### 3. Criação e Configuração do Banco de Dados

1. Dentro da pasta `projeto-labook-backend/src/database`, crie um arquivo chamado `database.db` se ele ainda não existir.
2. Conecte-se ao banco de dados. É recomendado o uso da extensão MySQL da Weijan Chen para esta etapa.
3. No arquivo `database.sql`, você encontrará todas as queries de criação das tabelas necessárias. Execute todas elas no seu banco de dados.

### 4. Instalando Dependências e Iniciando a API

1. Abra um terminal e navegue até a pasta do projeto (`projeto-labook-backend/`).
2. Instale as dependências necessárias executando o seguinte comando:

```bash
# Instalação das dependências
$ npm install
```

3. Inicie a aplicação usando o seguinte comando:

```bash
# Executando a aplicação
$ npm run dev
```

Agora, a API do Labook está em execução e você pode acessar os endpoints através da URL base `http://localhost:3003`.

Certifique-se de seguir cada etapa cuidadosamente para garantir o correto funcionamento da API. Se você encontrar algum problema ou tiver dúvidas, sinta-se à vontade para buscar ajuda na equipe de suporte.

---

## Detalhes do Servidor

- **URL Base**: `http://localhost:3003`

---

## Autenticação

Antes de acessar os endpoints protegidos, você deve estar autenticado. Para fazer isso, primeiro você precisa criar uma conta usando o endpoint `signup` e, em seguida, usar suas credenciais para fazer login através do endpoint `login`. Isso fornecerá um token de autenticação que você deve incluir nos cabeçalhos de solicitação das operações protegidas.

---

## Endpoints

### 1. Signup: `[POST] /users/signup`

Cria uma nova conta de usuário.

__*Observação: Todos os usuários criados possuem os privilégios de um usuário padrão(normal), o que lhes permite criar postagens, visualizar as postagens de outros usuários e interagir ao dar likes ou dislikes.*__

**Corpo da Solicitação [body]:**
```json
{
  "name": "seu-nome",
  "email": "email@exemplo.com",
  "password": "senha123"
}
```

### 2. Login: `[POST] /users/login`

Realiza o login e recebe um token de autenticação.

**Corpo da Solicitação [body]:**
```json
{
  "email": "email@exemplo.com",
  "password": "senha123"
}
```

**Resposta Bem-sucedida:**
```json
{
  "token": "seu_token_de_autenticacao"
}
```

### 3. Create post: `[POST] /posts`

Cria um novo post.

**Cabeçalhos [headers]:**
- headers.authorization = "token jwt"

**Corpo da Solicitação [body]:**
```json
{
  "content": "Conteúdo do Post"
}
```

### 4. Edit post: `[PUT] /posts/:id`

Edita um post existente.

__*Observação: Apenas o proprietário do post consegue fazer edição do conteúdo.*__

**Cabeçalhos [headers]:**
- headers.authorization = "token jwt"

**Corpo da Solicitação [body]:**
```json
{
  "content": "Novo Conteúdo do Post"
}
```

### 5. Delete post: `[DELETE] /posts/:id`

Exclui um post.

__*Observação: Apenas o proprietário ou um usuário "admin" podem excluir um post.*__

**Cabeçalhos [headers]:**
- headers.authorization = "token jwt"

### 6. Like or dislike: `[POST] /posts/:id/like`

Curtir ou descurtir uma postagem.

__*Observações:*__

__*Curtir = `true`, descurtir = `false`.*__
__*Quem criou o post não pode dar like ou dislike no mesmo.*__
__*Caso dê um like em um post que já tenha dado like, o like é desfeito.*__
__*Caso dê um dislike em um post que já tenha dado dislike, o dislike é desfeito.*__
__*Caso dê um like em um post que tenha dado dislike, o like sobrescreve o*__ __*dislike.*__
__*Caso dê um dislike em um post que tenha dado like, o dislike sobrescreve o like.*__

**Cabeçalhos [headers]:**
- headers.authorization = "token jwt"

**Corpo da Solicitação [body]:**
```json
{
  "content": true or false
}
```
### 7. Get Post: `[Get] /posts`

Devolve todos os post existentes

**Cabeçalhos [headers]:**
- headers.authorization = "token jwt"


Isso conclui a documentação da API. Se você tiver alguma dúvida ou problema, sinta-se à vontade para entrar em contato com nossa equipe de suporte.


