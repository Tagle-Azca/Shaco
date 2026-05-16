import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import logger from './src/utils/logger.js';
import routes from './src/routes/index.js';
import { connectMongo } from './src/utils/mongo.js';

const app  = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api', routes);

app.get('/health', (_req, res) => res.json({ status: 'ok' }));

app.use((err, _req, res, _next) => {
  const status = err.statusCode || 500;
  logger.error({ err }, err.message);
  res.status(status).json({ error: err.message });
});

app.listen(PORT, () => {
  logger.info(`shaco running on http://localhost:${PORT}`);
});
