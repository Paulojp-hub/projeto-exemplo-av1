import express from 'express';
import {
  atualizarCliente,
  buscarClientePorId,
  criarCliente,
  listarClientes
} from '../controllers/cliente.controller.js';

const router = express.Router();

router.get('/', listarClientes);
router.get('/:id', buscarClientePorId);
router.post('/', criarCliente);
router.put('/:id', atualizarCliente);

export default router;
