# API de pedidos — AV1 de qualidade e refatoração

API REST simples para cadastrar clientes e processar pedidos com desconto e
frete. Este repositório usa o projeto-exemplo da disciplina como base para um
diagnóstico de qualidade, uma refatoração orientada a Clean Code e a prática de
um fluxo Git com branch e commits atômicos.

## Requisitos

- Node.js 20 ou superior
- npm

## Como executar localmente

```bash
npm install
copy .env.example .env
npm start
```

No Linux ou macOS, substitua o segundo comando por
`cp .env.example .env`. Por padrão, a API fica disponível em
`http://localhost:3000`.

## Como executar os testes

```bash
npm test
```

A suíte usa o executor de testes nativo do Node.js e cobre descontos,
validações de cliente, subtotal, processamento de pedido e cenários de erro.

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

## Melhorias realizadas

- Variáveis e funções vagas foram renomeadas para explicitar a intenção.
- A validação de nome e ID de cliente foi centralizada e reutilizada.
- O processamento de pedido foi dividido em validação, cálculo, criação,
  persistência e notificação.
- A cadeia de condicionais de desconto foi substituída por uma tabela de regras.
- Clientes, IDs e itens inválidos agora geram erros de domínio explícitos.
- Um middleware converte falhas em respostas HTTP previsíveis e registra logs
  estruturados sem expor detalhes internos ao cliente.
- Testes automatizados protegem as regras críticas.
- `.env` e outros arquivos locais são ignorados desde o primeiro commit; nenhum
  segredo faz parte do histórico.

O levantamento completo dos problemas originais e das métricas estimadas está
em [DIAGNOSTICO.md](DIAGNOSTICO.md).

## Fluxo Git adotado

- `main`: código original preservado como base.
- `refactor/limpeza-codigo`: diagnóstico, refatoração, testes e documentação.
- Commits separados por intenção para facilitar revisão e reversão.
