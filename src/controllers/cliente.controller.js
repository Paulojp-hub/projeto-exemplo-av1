import { clientes } from '../data/clientes.js';

export function criar(req, res) {
  const n = req.body.nome;
  if (!n || n.length < 3) {
    return res.status(400).json({ erro: 'Nome muito curto' });
  }
  const c = { id: clientes.length + 1, nome: n, email: req.body.email };
  clientes.push(c);
  res.status(201).json(c);
}

export function atualizar(req, res) {
  const n = req.body.nome;
  if (!n || n.length < 3) {
    return res.status(400).json({ erro: 'Nome muito curto' });
  }
  const id = Number(req.params.id);
  const c = clientes.find(x => x.id === id);
  c.nome = n;
  c.email = req.body.email;
  res.json(c);
}

export function listar(req, res) {
  res.json(clientes);
}

export function buscarPorId(req, res) {
  const id = Number(req.params.id);
  const c = clientes.find(x => x.id === id);
  res.json(c);
}
