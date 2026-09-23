# API de pedidos — AV2

[![CI](https://github.com/Paulojp-hub/projeto-exemplo-av1/actions/workflows/ci.yml/badge.svg)](https://github.com/Paulojp-hub/projeto-exemplo-av1/actions/workflows/ci.yml)

API REST simples para cadastrar clientes e processar pedidos com desconto e
frete. A AV2 acrescenta testes unitários e de integração, cobertura mínima e um
pipeline de integração contínua.

## Tecnologias

- Node.js 22
- Express 4
- Test runner e cobertura nativos do Node.js
- ESLint e Prettier
- GitHub Actions

## Como executar

```bash
npm install
copy .env.example .env
npm start
```

No Linux ou macOS, use `cp .env.example .env`. Por padrão, a API fica em
`http://localhost:3000`. A variável `PORT` permite escolher outra porta.

## Testes e qualidade

```bash
npm test              # testes unitários e de integração
npm run coverage      # testes com limite mínimo de 60% nas linhas
npm run lint          # análise estática com ESLint
npm run format:check  # conferência de formatação com Prettier
```

A suíte tem cenários de sucesso e erro nas regras de negócio. O teste de
integração inicia a aplicação em uma porta temporária e percorre rotas HTTP
reais para cadastrar um cliente, criar um pedido e validar uma resposta 404.
Na validação local desta versão, a cobertura total de linhas foi de **93,36%**.

O workflow em `.github/workflows/ci.yml` executa instalação limpa, lint,
formatação, testes e cobertura em cada push da AV2 e em cada Pull Request para
`main`.

## Endpoints

| Método | Rota            | Finalidade           |
| ------ | --------------- | -------------------- |
| `GET`  | `/clientes`     | Listar clientes      |
| `GET`  | `/clientes/:id` | Buscar um cliente    |
| `POST` | `/clientes`     | Criar um cliente     |
| `PUT`  | `/clientes/:id` | Atualizar um cliente |
| `GET`  | `/pedidos`      | Listar pedidos       |
| `POST` | `/pedidos`      | Criar um pedido      |

Exemplo de cliente:

```json
{
  "nome": "Maria Silva",
  "email": "maria@example.com"
}
```

Exemplo de pedido:

```json
{
  "clienteId": 1,
  "tipoDesconto": "natal",
  "itens": [{ "preco": 100, "quantidade": 2 }]
}
```

Os tipos de desconto reconhecidos são `natal`, `blackfriday` e `aniversario`.
A especificação OpenAPI, com exemplos de sucesso e erro, está em
[`docs/openapi.yaml`](docs/openapi.yaml).

## Estrutura principal

```text
projeto-exemplo-av1/
├── .github/workflows/ci.yml
├── docs/openapi.yaml
├── src/
├── test/
├── eslint.config.js
├── package.json
└── README.md
```

## Histórico do projeto

A refatoração da AV1 foi mesclada na `main` pela PR #1. O diagnóstico original
de code smells e métricas está em [`DIAGNOSTICO.md`](DIAGNOSTICO.md). As
mudanças da AV2 foram desenvolvidas na branch `av2/testes-ci` em commits
separados por responsabilidade.
