# BORROW — Compartilhamento e empréstimo de itens

O **BORROW** é uma aplicação web que facilita o compartilhamento de objetos entre pessoas. Usuários podem disponibilizar itens, explorar o que está disponível e gerenciar solicitações de empréstimo, incluindo as etapas de aceitação, devolução e avaliação.

O projeto foi desenvolvido como aplicação full-stack, com uma interface em React e uma API própria responsável pela autenticação, regras de negócio e persistência dos dados.

## Funcionalidades

### Usuários
- Cadastro e login.
- Autenticação por token e acesso a rotas protegidas.
- Consulta dos dados do usuário autenticado.

### Itens
- Explorar itens cadastrados.
- Consultar os detalhes de um item.
- Cadastrar, editar e excluir itens próprios.
- Consultar a lista de itens disponibilizados pelo usuário autenticado.

### Empréstimos
- Solicitar o empréstimo de um item com datas de início e devolução.
- Aceitar ou rejeitar solicitações recebidas.
- Consultar empréstimos relacionados ao usuário.
- Solicitar a devolução e confirmar o retorno do item.
- Avaliar um empréstimo concluído.

## Tecnologias

### Front-end
- React 19
- TypeScript
- Vite
- React Router
- Axios
- Lucide React
- CSS

### Back-end
- Node.js
- TypeScript
- Express 5
- Prisma ORM 7
- PostgreSQL
- `bcrypt` para hash de senhas
- JWT para autenticação

## Organização do projeto

```text
BORROW/
├── Borrow/                 # Aplicação front-end
│   └── src/
│       ├── components/     # Componentes reutilizáveis
│       ├── contexts/       # Contexto de autenticação
│       ├── hooks/          # Hooks de itens, empréstimos e autenticação
│       ├── pages/          # Páginas da aplicação
│       ├── routes/         # Rotas do front-end
│       ├── services/       # Comunicação com a API
│       ├── types/          # Tipos TypeScript
│       └── utils/          # Utilitários
└── backend/                # API REST
    ├── prisma/             # Schema e migrations
    └── src/
        ├── config/          # Configuração do banco
        ├── controllers/     # Entrada e saída das requisições
        ├── middlewares/     # Autenticação e tratamento de erros
        ├── routes/          # Rotas da API
        ├── services/        # Regras de negócio
        └── types/           # Tipos TypeScript
```

## Requisitos

- Node.js e npm
- PostgreSQL
- Git

## Como executar localmente

### 1. Clonar o repositório

```bash
git clone https://github.com/Anselmo5/BORROW.git
cd BORROW
```

### 2. Configurar o back-end

```bash
cd backend
npm install
```

Crie um arquivo `.env` dentro da pasta `backend`:

```env
DATABASE_URL="SUA_URL_DE_CONEXAO_POSTGRESQL"
JWT_SECRET="DEFINA_UMA_CHAVE_SECRETA_FORTE"
PORT=3333
```

O `DATABASE_URL` deve apontar para seu banco PostgreSQL. Não compartilhe nem publique os valores reais desse arquivo.

**Dependências a conferir:** no código enviado, o back-end importa `tsx` para o script de desenvolvimento e `jsonwebtoken` para autenticação, mas esses pacotes não aparecem declarados no `package.json`/`package-lock.json`. Antes de executar em uma instalação limpa, adicione-os ao projeto:

```bash
npm install jsonwebtoken
npm install -D tsx @types/jsonwebtoken
```

Gere o Prisma Client e aplique as migrations:

```bash
npx prisma generate --config prisma7.config.ts
npx prisma migrate deploy --config prisma7.config.ts
```

Inicie a API:

```bash
npm run dev
```

Localmente, a API inicia por padrão na porta `3333`. A rota raiz `http://localhost:3333/` retorna uma mensagem indicando que a API está funcionando. A versão hospedada está disponível em `https://borrow-7gma.onrender.com`.

### 3. Configurar o front-end

Abra outro terminal a partir da pasta raiz do repositório:

```bash
cd Borrow
npm install
npm run dev
```

Abra no navegador o endereço local exibido pelo Vite. O front-end está configurado para consumir a API hospedada em `https://borrow-7gma.onrender.com`.

## Principais rotas da API

As rotas abaixo refletem a estrutura de rotas do back-end. As rotas marcadas como protegidas exigem autenticação.

| Método | Rota | Descrição | Autenticação |
|---|---|---|---|
| `POST` | `/auth/register` | Cadastrar usuário | Não |
| `POST` | `/auth/login` | Entrar na aplicação | Não |
| `GET` | `/auth/me` | Consultar usuário autenticado | Sim |
| `GET` | `/items` | Listar itens | Não |
| `POST` | `/items` | Cadastrar item | Sim |
| `GET` | `/items/my` | Listar itens do usuário | Sim |
| `GET` | `/items/:id` | Consultar item | Não |
| `PUT` | `/items/:id` | Atualizar item | Sim |
| `DELETE` | `/items/:id` | Excluir item | Sim |
| `POST` | `/loans` | Solicitar empréstimo | Sim |
| `GET` | `/loans` | Listar empréstimos do usuário | Sim |
| `POST` | `/loans/:id/accept` | Aceitar solicitação | Sim |
| `POST` | `/loans/:id/reject` | Rejeitar solicitação | Sim |
| `POST` | `/loans/:id/request-return` | Solicitar devolução | Sim |
| `POST` | `/loans/:id/confirm-return` | Confirmar devolução | Sim |
| `POST` | `/loans/:id/rate` | Avaliar empréstimo | Sim |

## Objetivo e aprendizados

O BORROW foi uma oportunidade de praticar o desenvolvimento de uma aplicação completa, conectando interface, API e banco de dados. Durante sua construção, trabalhei com organização de componentes e serviços, autenticação, rotas protegidas, modelagem relacional, regras de negócio e diferentes estados de um fluxo de empréstimo.

## Autor

**Anselmo Henrique**

- GitHub: [Anselmo5](https://github.com/Anselmo5)
- LinkedIn: [Anselmo Henrique](https://www.linkedin.com/in/anselmo-henrique-266647233/)
