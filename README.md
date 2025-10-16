# NestJS Template

## 1. Objetivo

Esta documentação tem como objetivo propor um **padrão oficial de estrutura e arquitetura** para todos os projetos backend desenvolvidos pela empresa utilizando **NestJS e TypeScript**.
A proposta visa garantir **uniformidade, escalabilidade, legibilidade e facilidade de manutenção** em todos os projetos, independentemente do tamanho ou do time envolvido.

O padrão é baseado no **Template API Nest**, desenvolvido com foco em **boas práticas de engenharia de software**, **princípios arquiteturais sólidos** e **adoção de ferramentas modernas** para desenvolvimento, testes e entrega contínua.

### Documentação Swagger/Scalar

```bash
http://localhost:3333/docs
```

---

## 2. Visão Geral

O **Template API Nest** fornece uma base arquitetural robusta que combina os conceitos de **Domain-Driven Design (DDD)**, **Event-Driven Architecture** e **Clean Architecture**, aliados ao ecossistema do **NestJS**.
O projeto busca equilibrar **simplicidade inicial** com **evolutividade a longo prazo**, permitindo que aplicações cresçam de forma organizada e sustentável.

Essa estrutura foi desenhada com o propósito de:

- Padronizar a forma como APIs são iniciadas e estruturadas;
- Facilitar a integração entre times e projetos;
- Garantir testabilidade e isolamento das regras de negócio;
- Promover práticas de engenharia consistentes e de alta qualidade.

---

## 3. Tecnologias e Ferramentas Padronizadas

| Categoria              | Ferramenta               | Finalidade                                                     |
| ---------------------- | ------------------------ | -------------------------------------------------------------- |
| Framework Backend      | **NestJS**               | Estrutura modular e escalável para desenvolvimento de APIs.    |
| Linguagem              | **TypeScript**           | Tipagem estática e maior segurança no desenvolvimento.         |
| ORM                    | **Prisma ORM**           | Mapeamento e acesso simplificado ao banco de dados.            |
| Testes                 | **Jest/Test Containers** | Framework de testes automatizados e containers para testes.    |
| Documentação           | **Swagger** / **Scalar** | Geração automática e visual de documentação das APIs.          |
| Padronização de Código | **Biome**                | Linter e formatter integrados.                                 |
| Containerização        | **Docker**               | Ambiente isolado e replicável para desenvolvimento e produção. |
| Teste de Rotas         | **REST Client (VSCode)** | Validação e simulação de endpoints localmente.                 |

Essas ferramentas foram selecionadas por sua ampla adoção, maturidade no mercado e integração fluida com o ecossistema NestJS.

---

## 4. Arquitetura Proposta

A arquitetura é organizada em **três grandes camadas**, separadas por responsabilidades e alinhadas aos princípios do DDD e da Clean Architecture:

```
src/
├── core/
│   ├── entities/
│   ├── errors/
│   ├── events/
│   ├── type/
│   └── either.ts
├── domain/
│   └── <contexto_de_negocio>/
│       ├── application/
│       │   ├── repositories/
│       │   ├── subscribers/
│       │   └── use-cases/
│       │       └── errors/
│       └── enterprise/
│           ├── entities/
│           └── events/
└── infra/
    ├── http/
    │   └── controllers/
    │       └── <contexto_de_negocio>/
    │           └── dtos/
    ├── configs/
    ├── events/
    └── database/
        └── mapper/
```

### Descrição das Camadas

#### **Core Layer**

Camada fundamental que contém abstrações e componentes genéricos compartilhados entre todos os domínios:

- **Entities**: Entidades base e agregados reutilizáveis.
- **Errors**: Tipos de erro genéricos e customizáveis.
- **Events**: Infraestrutura para manipulação de eventos de domínio.
- **Either.ts**: Implementação de `Either` para controle funcional de erros.
- **Type/**: Tipagens utilitárias e interfaces compartilhadas.

#### **Domain Layer**

Camada de negócio, totalmente isolada da infraestrutura.
Divide-se em módulos de contexto (ex: `accounts`, `contracts`, `fiscaliza`), cada um com:

- **Enterprise**: Entidades e eventos do domínio.
- **Application**: Casos de uso, repositórios e adaptadores para a camada de domínio.

#### **Infra Layer**

Camada que conecta a aplicação ao mundo externo:

- **HTTP**: Controladores e interceptors de rotas.
  - **controllers**: Controladores organizados por contexto.
    - **<contexto_de_negocio>**: Objetos de transferência de dados para validação e mapeamento.
      - **DTOs**: Objetos de transferência de dados para validação e mapeamento.
  - **presenters/**: Mapeamento de entidades para respostas HTTP.
  - **interceptors/**: Interceptadores para manipulação respostas e erros.
- **Configs**: Configurações globais (CORS, envs, logs, etc.).
- **Events**: Implementações concretas de eventos e filas.
- **Database**: Integração com Prisma ORM e configurações de persistência.
  - **mapper/**: Mapeamento entre entidades de domínio e modelos de banco.

---

## 5. Padrões e Princípios Adotados

| Princípio / Padrão                | Descrição                                                                             |
| --------------------------------- | ------------------------------------------------------------------------------------- |
| **DDD (Domain-Driven Design)**    | Estruturação do domínio para refletir a linguagem do negócio.                         |
| **Event-Driven Architecture**     | Comunicação desacoplada via eventos, facilitando integração futura com microserviços. |
| **Repository Pattern**            | Abstração do acesso a dados, promovendo testabilidade e flexibilidade.                |
| **SOLID Principles**              | Código limpo, modular e extensível.                                                   |
| **TDD (Test-Driven Development)** | Casos de uso e regras de negócio cobertos por testes desde o início.                  |
| **DTOs (Data Transfer Objects)**  | Transferência de dados entre camadas com segurança e clareza.                         |
| **Presenters**                    | Mapeamento de entidades para respostas HTTP.                                          |
| **Functional Error Handling**     | Uso de `Either` para controle previsível de fluxos de sucesso e falha.                |
| **CI/CD e Docker**                | Automação de integração e deploy, além de containerização completa.                   |

Esses padrões visam garantir **qualidade, clareza e extensibilidade** do código em todos os projetos.

---

## 6. Pontos Positivos da Adoção

- ✅ **Escalabilidade** – a separação de camadas e contextos permite que o sistema cresça de forma modular, sem acoplamento excessivo.
- ✅ **Testabilidade** – cada caso de uso é isolado, facilitando testes unitários e integração contínua.
- ✅ **Padronização** – todos os projetos compartilham a mesma estrutura e convenções, reduzindo curva de aprendizado.
- ✅ **Evolutividade** – fácil adição de novos módulos, serviços e contextos de domínio.
- ✅ **Clareza Arquitetural** – código mais previsível e de fácil leitura, mesmo por novos desenvolvedores.
- ✅ **Aderência a Boas Práticas** – aplicação dos princípios SOLID e DDD de forma pragmática.
- ✅ **Integração Simplificada com Microserviços** – devido ao uso de eventos e abstrações bem definidas.

---

## 7. Pontos de Atenção / Desafios

- ⚠️ **Curva de aprendizado inicial** – a aplicação de DDD e Clean Architecture pode ser complexa para desenvolvedores sem experiência nesses padrões.
- ⚠️ **Sobrecarga para pequenos projetos** – para APIs simples, a separação de camadas pode parecer excessiva. (Recomenda-se a possibilidade de um template mais enxuto para esses casos, ex: Microservices).
- ⚠️ **Necessidade de disciplina de equipe** – o padrão exige consistência na criação de módulos, casos de uso e repositórios.
- ⚠️ **Custo inicial de setup** – a configuração completa de ambiente, testes e documentação demanda tempo inicial maior.
- ⚠️ **Manutenção de múltiplos contextos** – exige atenção na definição de boundaries e dependências entre domínios.

---

## 8. Recomendações para Adoção

1. **Utilizar o Template API Nest como ponto de partida** para todo novo projeto backend em NestJS.
2. **Definir um mantenedor técnico** responsável por revisar PRs e garantir aderência ao padrão.
3. **Treinar a equipe** em DDD, NestJS avançado e padrões de arquitetura limpa.
4. **Manter documentação interna viva** (em repositório ou Wiki) com exemplos e convenções atualizadas.
5. **Estabelecer pipelines de CI/CD** padronizados para build, testes e deploy.
6. **Revisar o padrão semestralmente**, garantindo atualização com novas práticas e ferramentas.

---

## 9. Conclusão

A adoção do **Template API Nest** como padrão arquitetural e estrutural para os projetos backend oferece uma base sólida, moderna e escalável para o desenvolvimento de APIs corporativas.
Apesar da curva de aprendizado inicial, os benefícios a médio e longo prazo — em **qualidade de código**, **consistência entre projetos** e **redução de custos de manutenção** — justificam plenamente a padronização.

Esse modelo favorece o crescimento sustentável da base de código, a integração entre times e o alinhamento técnico da empresa em torno de práticas de engenharia consolidadas.

---

## 10. Autores e Colaboradores

- [Victor Palha](https://github.com/Victor-Palha)
- [Igor Abreu](https://github.com/igorabreu29)
- [Esaú Bandeira](https://github.com/Esau-Bandeira)
