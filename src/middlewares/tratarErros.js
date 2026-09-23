import { ErroAplicacao } from '../errors/ErroAplicacao.js';
import { logger } from '../config/logger.js';

export function tratarErros(erro, requisicao, resposta, proximo) {
  void proximo;

  const statusHttp = erro instanceof ErroAplicacao ? erro.statusHttp : 500;
  const mensagemPublica = statusHttp === 500
    ? 'Erro interno do servidor'
    : erro.message;

  logger.erro('Falha ao processar requisição', {
    metodo: requisicao.method,
    rota: requisicao.originalUrl,
    statusHttp,
    erro: erro.message
  });

  resposta.status(statusHttp).json({ erro: mensagemPublica });
}
