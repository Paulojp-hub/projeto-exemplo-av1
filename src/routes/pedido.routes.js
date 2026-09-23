import express from 'express';
import { criar, listar } from '../controllers/pedido.controller.js';

const router = express.Router();

router.get('/', listar);
router.post('/', criar);

export default router;
