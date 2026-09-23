import { processarPedido, listarPedidos } from '../services/pedidoService.js';

export function criarPedido(requisicao, resposta) {
  const { clienteId, itens, tipoDesconto } = requisicao.body;
  const pedido = processarPedido(clienteId, itens, tipoDesconto);
  resposta.status(201).json(pedido);
}

export function listarPedidosCadastrados(requisicao, resposta) {
  void requisicao;
  resposta.json(listarPedidos());
}
