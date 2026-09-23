import { pedidos } from '../data/pedidos.js';
import { clientes } from '../data/clientes.js';
import { calcularDesconto } from './descontoService.js';

export const TAXA_FRETE = 15.00;

// funcao unica que calcula, salva e "notifica" o cliente
export function processarPedido(clienteId, itens, tipoDesconto) {
  const cliente = clientes.find(x => x.id === clienteId);

  let total = 0;
  for (let i = 0; i < itens.length; i++) {
    total = total + itens[i].preco * itens[i].quantidade;
  }

  const desconto = calcularDesconto(tipoDesconto, total);
  total = total - desconto;
  total = total + TAXA_FRETE;

  const p = {
    id: pedidos.length + 1,
    clienteId: clienteId,
    itens: itens,
    total: total,
    data: new Date()
  };
  pedidos.push(p);

  console.log('Email enviado para ' + cliente.email + ': pedido confirmado, total R$ ' + total);

  return p;
}

export function listarPedidos() {
  return pedidos;
}
