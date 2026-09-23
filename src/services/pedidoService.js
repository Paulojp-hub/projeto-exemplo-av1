import { pedidos } from '../data/pedidos.js';
import { clientes } from '../data/clientes.js';
import { calcularDesconto } from './descontoService.js';
import { ErroAplicacao } from '../errors/ErroAplicacao.js';
import { logger } from '../config/logger.js';
import { validarIdCliente } from '../validators/clienteValidator.js';

export const TAXA_FRETE = 15.00;

function buscarCliente(clienteId) {
  const clienteEncontrado = clientes.find(cliente => cliente.id === clienteId);

  if (!clienteEncontrado) {
    throw new ErroAplicacao('Cliente não encontrado', 404);
  }

  return clienteEncontrado;
}

function validarItens(itens) {
  if (!Array.isArray(itens) || itens.length === 0) {
    throw new ErroAplicacao('O pedido deve conter pelo menos um item', 400);
  }

  const possuiItemInvalido = itens.some(item => (
    !Number.isFinite(item?.preco)
    || item.preco < 0
    || !Number.isInteger(item?.quantidade)
    || item.quantidade <= 0
  ));

  if (possuiItemInvalido) {
    throw new ErroAplicacao('Preço e quantidade dos itens devem ser válidos', 400);
  }
}

export function calcularSubtotal(itens) {
  validarItens(itens);
  return itens.reduce(
    (subtotal, item) => subtotal + (item.preco * item.quantidade),
    0
  );
}

function calcularTotal(subtotal, tipoDesconto) {
  const desconto = calcularDesconto(tipoDesconto, subtotal);
  return Number((subtotal - desconto + TAXA_FRETE).toFixed(2));
}

function criarPedido(clienteId, itens, total) {
  return {
    id: pedidos.length + 1,
    clienteId,
    itens,
    total,
    data: new Date()
  };
}

function salvarPedido(pedido) {
  pedidos.push(pedido);
}

function notificarCliente(cliente, pedido) {
  logger.info('Pedido confirmado para o cliente', {
    clienteId: cliente.id,
    pedidoId: pedido.id,
    total: pedido.total
  });
}

export function processarPedido(clienteIdInformado, itens, tipoDesconto) {
  const clienteId = validarIdCliente(clienteIdInformado);
  const cliente = buscarCliente(clienteId);
  const subtotal = calcularSubtotal(itens);
  const total = calcularTotal(subtotal, tipoDesconto);
  const pedido = criarPedido(clienteId, itens, total);

  salvarPedido(pedido);
  notificarCliente(cliente, pedido);
  return pedido;
}

export function listarPedidos() {
  return pedidos;
}
