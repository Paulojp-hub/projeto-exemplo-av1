const PERCENTUAIS_DE_DESCONTO = Object.freeze({
  natal: 0.1,
  blackfriday: 0.3,
  aniversario: 0.15
});

export function calcularDesconto(tipoDesconto, subtotal) {
  const percentual = PERCENTUAIS_DE_DESCONTO[tipoDesconto] ?? 0;
  return subtotal * percentual;
}
