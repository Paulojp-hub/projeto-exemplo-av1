import test, { beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import { clientes } from '../src/data/clientes.js';
import { pedidos } from '../src/data/pedidos.js';
import {
  calcularSubtotal,
  processarPedido
} from '../src/services/pedidoService.js';

beforeEach(() => {
  clientes.length = 0;
  pedidos.length = 0;
});
test('calcula subtotal de vários itens', () => {
  const subtotal = calcularSubtotal([
    { preco: 10, quantidade: 2 },
    { preco: 5.5, quantidade: 1 }
  ]);

  assert.equal(subtotal, 25.5);
});

test('processa pedido com desconto e frete', () => {
  clientes.push({ id: 1, nome: 'Maria', email: 'maria@example.com' });

  const pedido = processarPedido(
    1,
    [{ preco: 100, quantidade: 1 }],
    'natal'
  );

  assert.equal(pedido.total, 105);
  assert.equal(pedidos.length, 1);
});

test('rejeita cliente inexistente e item inválido', () => {
  assert.throws(
    () => processarPedido(99, [{ preco: 10, quantidade: 1 }]),
    /Cliente não encontrado/
  );

  clientes.push({ id: 1, nome: 'Maria', email: 'maria@example.com' });
  assert.throws(
    () => processarPedido(1, [{ preco: -1, quantidade: 0 }]),
    /Preço e quantidade/
  );
});
