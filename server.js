require('dotenv').config();
const express = require('express');
const cors    = require('cors');
const logger  = require('./src/utils/logger');
const routes  = require('./src/routes/index');

const app  = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api', routes);

app.get('/health', (_req, res) => res.json({ status: 'ok' }));

// Error handler centralizado
app.use((err, _req, res, _next) => {
  const status = err.statusCode || 500;
  logger.error({ err }, err.message);
  res.status(status).json({ error: err.message });
});

app.listen(PORT, () => {
  logger.info(`shaco running on http://localhost:${PORT}`);
});
