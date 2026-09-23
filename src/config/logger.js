function registrar(nivel, mensagem, contexto = {}) {
  const entrada = {
    timestamp: new Date().toISOString(),
    nivel,
    mensagem,
    ...contexto
  };

  const escrever = nivel === 'erro' ? console.error : console.info;
  escrever(JSON.stringify(entrada));
}

export const logger = {
  info(mensagem, contexto) {
    registrar('info', mensagem, contexto);
  },
  erro(mensagem, contexto) {
    registrar('erro', mensagem, contexto);
  }
};
