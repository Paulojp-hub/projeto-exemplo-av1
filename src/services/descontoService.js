export function calcularDesconto(tipo, valor) {
  if (tipo === 'natal') {
    return valor * 0.1;
  }
  if (tipo === 'blackfriday') {
    return valor * 0.3;
  }
  if (tipo === 'aniversario') {
    return valor * 0.15;
  }
  return 0;
}
