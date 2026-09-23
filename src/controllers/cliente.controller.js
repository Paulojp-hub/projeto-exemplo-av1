import { clientes } from '../data/clientes.js';
import { ErroAplicacao } from '../errors/ErroAplicacao.js';
import {
  validarIdCliente,
  validarNomeCliente
} from '../validators/clienteValidator.js';

function buscarCliente(clienteId) {
  const clienteEncontrado = clientes.find(
    (cliente) => cliente.id === clienteId
  );

  if (!clienteEncontrado) {
    throw new ErroAplicacao('Cliente não encontrado', 404);
  }

  return clienteEncontrado;
}

export function criarCliente(requisicao, resposta) {
  const nome = validarNomeCliente(requisicao.body.nome);
  const novoCliente = {
    id: clientes.length + 1,
    nome,
    email: requisicao.body.email
  };

  clientes.push(novoCliente);
  resposta.status(201).json(novoCliente);
}

export function atualizarCliente(requisicao, resposta) {
  const clienteId = validarIdCliente(requisicao.params.id);
  const clienteEncontrado = buscarCliente(clienteId);

  clienteEncontrado.nome = validarNomeCliente(requisicao.body.nome);
  clienteEncontrado.email = requisicao.body.email;
  resposta.json(clienteEncontrado);
}

export function listarClientes(requisicao, resposta) {
  resposta.json(clientes);
}

export function buscarClientePorId(requisicao, resposta) {
  const clienteId = validarIdCliente(requisicao.params.id);
  resposta.json(buscarCliente(clienteId));
}
