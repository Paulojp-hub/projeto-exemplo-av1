import test from 'node:test';
import assert from 'node:assert/strict';
import { calcularDesconto } from '../src/services/descontoService.js';

test('calcula os percentuais de desconto conhecidos', () => {
  assert.equal(calcularDesconto('natal', 100), 10);
  assert.equal(calcularDesconto('blackfriday', 100), 30);
  assert.equal(calcularDesconto('aniversario', 100), 15);
});

test('não aplica desconto quando o tipo é desconhecido', () => {
  assert.equal(calcularDesconto('inexistente', 100), 0);
});

