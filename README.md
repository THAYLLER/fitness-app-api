# Fitness App – API

[![Node.js](https://img.shields.io/badge/node-%3E=18.x-green)](https://nodejs.org) [![Yarn](https://img.shields.io/badge/yarn-%3E=1.22-blue)](https://yarnpkg.com) ![License](https://img.shields.io/badge/license-MIT-lightgrey)

> API REST para gerenciamento de usuários, atividades e assistente virtual de fitness (Chatbot) construída em NestJS, seguindo princípios **SOLID** e boas práticas de mercado.

## 📑 Sumário

- [Visão Geral](#visão-geral)
- [Tecnologias Principais](#tecnologias-principais)
- [Variáveis de Ambiente](#variáveis-de-ambiente)
- [Instalação](#instalação)
- [Execução](#execução)
- [Estrutura de Pastas](#estrutura-de-pastas)
- [Scripts Yarn](#scripts-yarn)
- [Testes](#testes)
- [Banco de Dados & Migrações](#banco-de-dados--migrações)
- [Deploy (Render)](#deploy-render)
- [Contribuição](#contribuição)
- [Roadmap](#roadmap)
- [Resumo das decisões técnicas adotadas](#resumo-das-decisões-técnicas-adotadas)
- [Licença](#licença)
- [Docker / Compose](#docker--compose)

## Visão Geral

O Fitness App disponibiliza endpoints para:

1. **Autenticação** (`/auth`) – Registro, Login e Refresh Token via JWT.
2. **Usuários** (`/users/me`) – Dados do usuário autenticado.
3. **Atividades** (`/activities`) – CRUD completo de atividades físicas.
4. **Chatbot** (`/chatbot/message`) – Integração com a IA **DeepSeek** para responder dúvidas de treino/nutrição.

Arquitetura fortemente inspirada em DDD e Clean Architecture, separando **Repositórios**, **Use-Cases** e **Controllers**. Todos os domínios são testados (unitários + e2e) e documentados com **Swagger**.

```mermaid
flowchart TD
    subgraph HTTP API
        A[Controller]
    end
    subgraph Core
        B[Use-Case]
        C[Entidade]
    end
    subgraph Infra
        D[Prisma Repository]
        E[DeepSeek Service]
    end
    A --> B --> C
    B -->|Persistência| D
    B -->|IA| E
```

## Tecnologias Principais

- **NestJS 11** – Framework Node com DI poderoso.
- **Prisma 6 + PostgreSQL** – ORM tipado & migrações.
- **JWT** – Autenticação stateless.
- **DeepSeek AI** – Respostas do Chatbot.
- **Swagger** – Documentação interativa.
- **Jest / Supertest** – Suite de testes completa.

## Variáveis de Ambiente

Copie `.env.example` para `.env` e preencha os valores:

```env
# Database
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DB"
PORT=3000

# JWT
JWT_SECRET="super_secret"
JWT_EXPIRATION=1h

# DeepSeek AI
DEEPSEEK_API_KEY="your_api_key"
DEEPSEEK_API_URL=https://api.deepseek.com/v1/chat/completions
DEEPSEEK_MODEL=deepseek-llm
DEEPSEEK_SYSTEM_PROMPT="Você é um assistente virtual de fitness..."

# Infra / Segurança
CORS_ORIGIN="*"            # Domínio(s) permitidos

# Observabilidade / OpenTelemetry
OTEL_SERVICE_NAME="fitness-api"
OTEL_EXPORTER_OTLP_ENDPOINT="http://localhost:4318"

# Cache
REDIS_URL="redis://localhost:6379"

# Sentry
SENTRY_URL="https://<key>@o<sentry_project>.ingest.sentry.io/<project_id>"
```

> **Atenção:** Nunca commite seus segredos; o arquivo `.env` está ignorado pelo Git.

## Instalação

```bash
# instalar dependências
$ yarn install

# gerar Prisma Client tipado
$ yarn prisma generate

# criar/atualizar schema local (opcional em dev)
$ yarn prisma migrate dev --name init
```

## Execução

```bash
# ambiente de desenvolvimento (watch)
$ yarn start:dev

# produção
$ yarn build && yarn start:prod
```

Depois de inicializado:

- API: `http://localhost:3000`
- Swagger: `http://localhost:3000/docs`

### Exemplos de requisição

Autenticar e chamar Chatbot (cURL):

```bash
# login
curl -X POST http://localhost:3000/auth/login \
  -H 'Content-Type: application/json' \
  -d '{"email":"user@example.com","password":"123456"}'

# supondo token="XYZ"
curl -X POST http://localhost:3000/chatbot/message \
  -H "Authorization: Bearer $token" \
  -H 'Content-Type: application/json' \
  -d '{"message":"Qual o melhor treino para hipertrofia?"}'
```

## Estrutura de Pastas

```
src/
 ├─ auth/          # Domínio de autenticação
 ├─ users/         # User queries
 ├─ activities/    # CRUD de atividades
 ├─ chatbot/       # IA DeepSeek + use-case
 │   └─ deepseek.service.ts
 ├─ prisma/        # PrismaService & módulo
 ├─ app.module.ts  # Módulo raiz
 └─ main.ts        # Bootstrap
```

## Scripts Yarn

| Script              | Descrição                                                |
|---------------------|----------------------------------------------------------|
| `start`             | Inicia aplicação em modo default                         |
| `start:dev`         | Hot Reload                                               |
| `build`             | Build de produção em `dist/`                             |
| `lint`              | ESLint + Prettier                                        |
| `format`            | Formata código                                           |
| `test`              | Testes unitários                                         |
| `test:e2e`          | Testes end-to-end                                        |
| `test:cov`          | Gera relatório de cobertura Jest                         |
| `prisma generate`   | Gera Prisma Client                                       |
| `prisma migrate`    | Executa migrações (`deploy` em produção)                 |

## Testes

- **Unitários**: Repositórios em memória + mocks de dependências (DeepSeek).
- **E2E**: Banco real + substituição do `DeepSeekService` por mock, garantindo isolamento.

Relatório de cobertura:

```bash
yarn test:cov
open coverage/lcov-report/index.html
```

## Banco de Dados & Migrações

Ambiente local:

```bash
yarn prisma migrate dev --name add_activity
```

Produção/Render:

```bash
yarn prisma migrate deploy
```

> Em Render, não utilize `migrate dev` pois o usuário não possui permissão DDL.

## Deploy (Render)

- **Build Command**: `yarn build`
- **Start Command**: `node dist/main`
- **Env Vars**: `DATABASE_URL`, `PORT`, `JWT_SECRET`, `DEEPSEEK_*`
- **Post Deploy**: `yarn prisma migrate deploy`

## Contribuição

1. Faça fork e crie branch `feature/<nome>`.
2. Commits seguindo Conventional Commits (hook Commitlint já configurado).
3. Abra Pull Request com descrição detalhada.
4. CI roda lint + testes; PR deve ficar verde.

## Roadmap

- Observabilidade (OpenTelemetry)
- Rate Limiting global
- Cache Redis para dados de leitura pesada
- RBAC (Roles & Permissions) avançado
- CI/CD completo (GitHub Actions)

## Resumo das decisões técnicas adotadas

1. **Arquitetura SOLID / Clean Layers**: separação clara em Entidades, Repositórios (abstrações), Use-Cases (regras de negócio), Infra (Prisma, Sentry, Redis) e Interface HTTP (Controllers + DTOs). Facilita testes, manutenção e troca de tecnologias.
2. **NestJS**: escolhido pela robusta injeção de dependências, módulos, interceptors, pipes, guards e integração nativa com Swagger.
3. **Prisma + PostgreSQL**: ORM tipado com migrações versionadas, geração automática de client e facilidade de refatoração de schema.
4. **Autenticação JWT**: tokens de acesso/refresh gerados via `@nestjs/jwt`, protegidos por `JwtAuthGuard` e `JwtStrategy`.
5. **Validações & Pipes**: `class-validator` + `ValidationPipe` global retornando HTTP 422.
6. **Documentação**: Swagger autogerado com exemplos em todos os DTOs, disponível em `/docs`.
7. **Qualidade de Código**: ESLint + Prettier, Husky + lint-staged para hooks pre-commit, Commitlint para mensagens padronizadas.
8. **Testes**: unitários (repositórios em memória), E2E (supertest), cobertura Jest.
9. **Observabilidade**: Health-check Terminus, métricas Prometheus, tracing OpenTelemetry, logs estruturados (Pino) e Sentry para erros.
10. **Infra Docker**: Dockerfile multistage e `docker-compose` com Postgres, Redis e OTLP Collector.

## Licença

Distribuído sob licença **MIT**. Veja `LICENSE` para mais detalhes.

## Observabilidade & Segurança

- **Health-check**: endpoint interno `/health` (verifica banco e memória).
- **Métricas Prometheus**: expostas em `/metrics` – prontas para scrape.
- **Tracing**: spans OpenTelemetry exportados via OTLP (`OTEL_*`).
- **Rate Limiting**: 30 requisições por minuto (`@nestjs/throttler`).
- **Helmet**: headers de segurança aplicados globalmente.
- **CORS**: origem configurável via `CORS_ORIGIN` no `.env`.
- **Sentry**: captura e reporte de exceções (`SENTRY_URL`).

## Docker / Compose

Para subir todo o stack (API + Postgres + Redis + OpenTelemetry Collector):

```bash
# build e start
$ docker compose up --build

# primeiro deploy: aplicar migrações
$ docker compose exec api yarn prisma migrate deploy
```

> O serviço expõe:
> • API: http://localhost:3000  
> • Swagger: http://localhost:3000/docs  
> • Postgres: localhost:5432 (usuario/pwd: postgres)  
> • Redis: localhost:6379  
> • OTLP Collector: http://localhost:4318
