import express from 'express';
import { criar, atualizar, listar, buscarPorId } from '../controllers/cliente.controller.js';

const router = express.Router();

router.get('/', listar);
router.get('/:id', buscarPorId);
router.post('/', criar);
router.put('/:id', atualizar);

export default router;
