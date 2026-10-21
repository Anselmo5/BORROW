# BORROW — Empréstimo e compartilhamento de itens

O **BORROW** é uma aplicação web desenvolvida para facilitar o empréstimo e o compartilhamento de itens entre usuários. A proposta é tornar esse processo mais organizado, permitindo que as pessoas disponibilizem seus objetos, solicitem empréstimos e acompanhem o andamento das solicitações.

O projeto foi desenvolvido como parte do meu portfólio, com foco no aprendizado de desenvolvimento Front-end e Back-end, integração entre aplicações e construção de uma experiência de usuário intuitiva.

## ✨ Funcionalidades

- **Autenticação de usuários:** cadastro e login.
- **Gerenciamento de itens:** disponibilização e consulta de itens cadastrados.
- **Solicitação de empréstimos:** usuários podem solicitar itens disponibilizados por outras pessoas.
- **Gerenciamento de solicitações:** acompanhamento e aceitação de solicitações de empréstimo.
- **Fluxo de empréstimo:** organização do ciclo de empréstimo e devolução dos itens.

> Atualize esta lista caso alguma funcionalidade ainda não esteja implementada na versão publicada.

## 🛠️ Tecnologias utilizadas

### Front-end
- React
- TypeScript
- Vite
- CSS

### Back-end
- Node.js
- Express
- TypeScript
- Prisma ORM
- PostgreSQL
- JWT para autenticação

## 🏗️ Arquitetura

A aplicação é dividida em duas partes principais:

- **Front-end:** responsável pela interface, interação com o usuário e comunicação com a API.
- **Back-end:** responsável pelas regras de negócio, autenticação, processamento das solicitações e persistência dos dados.

O front-end consome os endpoints da API, enquanto o back-end utiliza o Prisma para interagir com o banco de dados PostgreSQL.

## 🚀 Como executar o projeto

### Pré-requisitos

- Node.js
- npm
- PostgreSQL ou uma instância de banco compatível
- Git

### 1. Clone o repositório

```bash
git clone URL_DO_REPOSITORIO
cd BORROW
```

### 2. Configure o Back-end

Entre na pasta do back-end:

```bash
cd backend
npm install
```

Configure as variáveis de ambiente necessárias em um arquivo `.env`, seguindo os nomes utilizados no projeto.

Exemplo ilustrativo:

```env
DATABASE_URL="SUA_URL_DO_BANCO"
JWT_SECRET="SUA_CHAVE_SECRETA"
```

**Importante:** os nomes e valores devem corresponder à configuração real da aplicação. Nunca publique credenciais ou chaves secretas.

Execute as migrações do banco de dados conforme a configuração do Prisma e inicie o servidor:

```bash
npm run dev
```

### 3. Configure o Front-end

Em outro terminal, entre na pasta do front-end:

```bash
cd frontend
npm install
npm run dev
```

Abra no navegador o endereço local informado pelo Vite.

> Confira os nomes reais das pastas, scripts e variáveis de ambiente do repositório antes de utilizar estes comandos.

## 🎯 Objetivo do projeto

O BORROW foi desenvolvido para praticar conceitos importantes do desenvolvimento de aplicações web, incluindo:

- Desenvolvimento de interfaces com React e TypeScript.
- Integração entre Front-end e Back-end por meio de uma API.
- Autenticação e autorização de usuários.
- Modelagem de dados e persistência com PostgreSQL.
- Implementação de regras de negócio para empréstimos.
- Organização e manutenção de uma aplicação dividida em camadas.

## 📚 Aprendizados

Durante o desenvolvimento, trabalhei na integração entre as diferentes partes da aplicação, no tratamento do fluxo de autenticação e na implementação das operações relacionadas aos empréstimos.

O projeto também contribuiu para minha compreensão de como uma interface depende das regras de negócio e dos dados fornecidos pelo back-end para oferecer uma experiência consistente.

## 👨‍💻 Autor

**Anselmo Henrique**
- LinkedIn: [Seu perfil do LinkedIn](https://www.linkedin.com/in/anselmo-henrique-266647233/?isSelfProfile=true)
