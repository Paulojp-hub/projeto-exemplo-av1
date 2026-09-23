# Diagnóstico de qualidade

Este diagnóstico foi feito sobre o código original do projeto-exemplo, antes da
refatoração registrada na branch `refactor/limpeza-codigo`.

## Code smells identificados

### 1. Nomes vagos

`src/controllers/cliente.controller.js` usava variáveis como `n`, `c` e `x`.
Esses nomes não comunicavam se o valor representava nome, cliente encontrado ou
item da busca. O mesmo ocorria com `p` em `pedidoService.js`.

### 2. Duplicação de validação

As operações de criação e atualização de cliente repetiam a mesma condição para
validar o nome e a mesma resposta HTTP de erro. Qualquer mudança na regra exigia
alterar dois pontos.

### 3. Função com responsabilidades demais

`processarPedido` buscava o cliente, calculava subtotal, aplicava desconto,
somava frete, montava e salvava o pedido e ainda simulava o envio de e-mail.
Isso dificultava testes isolados e misturava regra de negócio, persistência e
notificação.

### 4. Falhas não tratadas

- Um `clienteId` inexistente fazia o acesso a `cliente.email` lançar um erro não
  intencional.
- `atualizar` tentava alterar propriedades de um cliente inexistente.
- IDs inválidos, lista de itens vazia, preços e quantidades inválidos não eram
  rejeitados explicitamente.
- Os controllers não convertiam erros de domínio em respostas HTTP previsíveis.

### 5. Condicionais repetitivas para descontos

`calcularDesconto` possuía uma sequência de três `if` com a mesma estrutura.
Uma tabela de percentuais expressa melhor a regra e evita ampliar a cadeia a
cada novo tipo de desconto.

### 6. Risco de segurança no arquivo de configuração

O pacote original continha um `.env` com senha e chave de API de exemplo. Mesmo
falsos, esses valores incentivavam uma prática insegura. A entrega não copia
esse arquivo, ignora qualquer `.env` desde o primeiro commit e fornece apenas
`.env.example` sem segredo.

## Métricas estimadas

Complexidade ciclomática foi estimada pela regra `1 + número de decisões`:

| Função original | Decisões | Complexidade estimada |
| --- | ---: | ---: |
| `processarPedido` | 1 laço `for` | 2 |
| `calcularDesconto` | 3 condições `if` | 4 |
| `criar` cliente | 1 condição `if` | 2 |
| `atualizar` cliente | 1 condição `if` | 2 |

Também havia um ponto de duplicação direta: o bloco de validação do nome do
cliente aparecia duas vezes. Após a refatoração, ele fica centralizado em uma
única função.

## Plano de refatoração

1. Substituir nomes vagos por nomes orientados à intenção.
2. Extrair e reutilizar validações de cliente.
3. Separar validação, cálculo, criação, persistência e notificação de pedidos.
4. Representar descontos com uma tabela de percentuais.
5. Adicionar erros de domínio, middleware HTTP e logs estruturados.
6. Cobrir as regras críticas com testes automatizados.
