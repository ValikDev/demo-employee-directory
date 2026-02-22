import express from 'express';
import cors from 'cors';
import employeeRoutes from './routes/employees.js';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.use(employeeRoutes);

export default app;
