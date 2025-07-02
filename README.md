# Fitness App – API

API REST em NestJS seguindo princípios SOLID, utilizando PostgreSQL (via Prisma) e documentação Swagger.

## Pré-requisitos

* Node.js >= 18
* Yarn >= 1.22
* Banco PostgreSQL (ou URL de conexão)

## Variáveis de ambiente

Crie um arquivo `.env` na raiz:

```env
DATABASE_URL="postgresql://<usuário>:<senha>@<host>:<porta>/<database>"
PORT=3000
```

## Instalação

```bash
# instalar dependências
$ yarn install

# gerar Prisma Client
$ yarn prisma generate
```

## Execução

```bash
# desenvolvimento (watch mode)
$ yarn start:dev

# produção
$ yarn build && yarn start:prod
```

A aplicação iniciará na porta definida por `PORT` (padrão 3000). A documentação Swagger estará disponível em:

```
http://localhost:3000/docs
```

## Scripts úteis

| Script             | Descrição                                           |
|--------------------|-----------------------------------------------------|
| `yarn start`       | Inicia a aplicação em modo default                  |
| `yarn start:dev`   | Inicia em modo desenvolvimento com Hot Reload       |
| `yarn build`       | Gera build de produção em `dist/`                   |
| `yarn prisma db`   | Executa comandos Prisma (`migrate`, `studio` etc.)  |
| `yarn lint`        | Lint + fix                                          |
| `yarn format`      | Formata código com Prettier                         |
| `yarn test`        | Testes unitários                                    |
| `yarn test:e2e`    | Testes end-to-end (fluxo Auth completo)             |
| `yarn test:cov`    | Gera relatório de cobertura Jest                   |

## Convenções de commit

O projeto utiliza Husky + lint-staged + Commitlint para padronizar commits. Após `git commit`, os hooks fazem lint e formatação automáticos.

## Estrutura resumida

```
src/
 ├─ auth/            # Domínio de autenticação
 ├─ prisma/          # Serviço e módulo Prisma
 ├─ main.ts          # Bootstrap da aplicação
 └─ app.module.ts    # Módulo raiz
```

## Licença

MIT

## Resumo das decisões técnicas adotadas

1. **Arquitetura SOLID / Camadas**: Separação em Entidades, Repositórios (abstrações), Use-Cases (regras de negócio), Infra (Prisma) e Interface HTTP (Controllers + DTOs). Facilita testes, manutenção e troca de tecnologias.
2. **NestJS**: Framework escolhido por oferecer módulo DI robusto, testes integrados, interceptors, pipes e integração nativa com Swagger.
3. **Prisma + PostgreSQL**: ORM tipado, migrações versionadas, geração automática de client e facilidade para trocar de banco.
4. **JWT Autenticação**: `@nestjs/jwt` para tokens de acesso e refresh; configuração assíncrona com `ConfigModule` para secret/timeouts via `.env`.
5. **Validações**: `class-validator` + `ValidationPipe` global retornando HTTP 422.
6. **Documentação**: Swagger autogerado com exemplos (DTOs anotados com `@ApiProperty`). Disponível em `/docs`.
7. **Qualidade de código**: ESLint + Prettier integrados, Husky + lint-staged para hooks de commit, Commitlint para mensagens padronizadas.
8. **Testes**:
   - Unitários: repositórios em memória, mocks de dependências.
   - Integração/E2E: `supertest` exercitando fluxo real contra banco de teste.
   - Scripts Yarn disponíveis (`test`, `test:e2e`, `test:cov`).
9. **CI/CD** (proposta): pipeline executa lint, testes unitários, integração, build e deploy (Render). Migrações aplicadas com `prisma migrate deploy`.
