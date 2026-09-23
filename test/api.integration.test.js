import test, { after, before, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import app from '../src/app.js';
import { clientes } from '../src/data/clientes.js';
import { pedidos } from '../src/data/pedidos.js';

let servidor;
let enderecoBase;

before(async () => {
  servidor = app.listen(0);
  await new Promise((resolve) => servidor.once('listening', resolve));
  enderecoBase = `http://127.0.0.1:${servidor.address().port}`;
});

after(async () => {
  await new Promise((resolve, reject) => {
    servidor.close((erro) => (erro ? reject(erro) : resolve()));
  });
});

beforeEach(() => {
  clientes.length = 0;
  pedidos.length = 0;
});

test('cadastra cliente e cria pedido pela API completa', async () => {
  const respostaCliente = await fetch(`${enderecoBase}/clientes`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ nome: 'Maria Silva', email: 'maria@example.com' })
  });
  const cliente = await respostaCliente.json();

  const respostaPedido = await fetch(`${enderecoBase}/pedidos`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      clienteId: cliente.id,
      tipoDesconto: 'natal',
      itens: [{ preco: 100, quantidade: 1 }]
    })
  });
  const pedido = await respostaPedido.json();

  assert.equal(respostaCliente.status, 201);
  assert.equal(respostaPedido.status, 201);
  assert.equal(pedido.clienteId, cliente.id);
  assert.equal(pedido.total, 105);
});

test('retorna erro HTTP para cliente inexistente', async () => {
  const resposta = await fetch(`${enderecoBase}/clientes/99`);
  const corpo = await resposta.json();

  assert.equal(resposta.status, 404);
  assert.deepEqual(corpo, { erro: 'Cliente não encontrado' });
});
