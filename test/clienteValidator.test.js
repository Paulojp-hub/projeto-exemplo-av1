import test from 'node:test';
import assert from 'node:assert/strict';
import {
  validarIdCliente,
  validarNomeCliente
} from '../src/validators/clienteValidator.js';

test('normaliza um nome de cliente válido', () => {
  assert.equal(validarNomeCliente('  Maria  '), 'Maria');
});

test('rejeita nome curto e ID inválido', () => {
  assert.throws(() => validarNomeCliente('Al'), /pelo menos 3 caracteres/);
  assert.throws(() => validarIdCliente('abc'), /ID de cliente inválido/);
});

