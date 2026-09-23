import { processarPedido, listarPedidos } from '../services/pedidoService.js';

export function criar(req, res) {
  const { clienteId, itens, tipoDesconto } = req.body;
  const pedido = processarPedido(clienteId, itens, tipoDesconto);
  res.status(201).json(pedido);
}

export function listar(req, res) {
  res.json(listarPedidos());
}
