import express from 'express';
import clienteRoutes from './routes/cliente.routes.js';
import pedidoRoutes from './routes/pedido.routes.js';

const app = express();
app.use(express.json());

app.use('/clientes', clienteRoutes);
app.use('/pedidos', pedidoRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('Servidor rodando na porta ' + PORT);
});

export default app;
