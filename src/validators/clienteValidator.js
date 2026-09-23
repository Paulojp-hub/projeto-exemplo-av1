import { ErroAplicacao } from '../errors/ErroAplicacao.js';

export function validarNomeCliente(nome) {
  const nomeNormalizado = typeof nome === 'string' ? nome.trim() : '';

  if (nomeNormalizado.length < 3) {
    throw new ErroAplicacao('Nome deve ter pelo menos 3 caracteres', 400);
  }

  return nomeNormalizado;
}
export function validarIdCliente(idInformado) {
  const clienteId = Number(idInformado);

  if (!Number.isInteger(clienteId) || clienteId <= 0) {
    throw new ErroAplicacao('ID de cliente inválido', 400);
  }

  return clienteId;
}
