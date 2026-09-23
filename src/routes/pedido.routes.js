import express from 'express';
import {
  criarPedido,
  listarPedidosCadastrados
} from '../controllers/pedido.controller.js';

const router = express.Router();

router.get('/', listarPedidosCadastrados);
router.post('/', criarPedido);

export default router;
