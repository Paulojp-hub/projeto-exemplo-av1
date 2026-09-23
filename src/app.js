import express from 'express';
import clienteRoutes from './routes/cliente.routes.js';
import pedidoRoutes from './routes/pedido.routes.js';
import { tratarErros } from './middlewares/tratarErros.js';

const app = express();
app.use(express.json());

app.use('/clientes', clienteRoutes);
app.use('/pedidos', pedidoRoutes);
app.use(tratarErros);

export default app;
