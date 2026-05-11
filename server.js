<<<<<<< HEAD
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
=======
import dotenv from 'dotenv';
import express from 'express';
import routes from './src/routes/index.js';
import { errorHandler, notFoundHandler } from './src/middleware/errorHandler.js';
import { connectMongo } from './src/utils/mongo.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use((req, res, next) => {
	const allowed = process.env.CORS_ORIGIN || '*';
	res.header('Access-Control-Allow-Origin', allowed);
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
	if (req.method === 'OPTIONS') {
		res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS');
		return res.sendStatus(204);
	}
	next();
});
app.use('/api', routes);
app.use(notFoundHandler);
app.use(errorHandler);

const startServer = async () => {
	await connectMongo();

	app.listen(port, () => {
		console.log(`Server listening on port ${port}`);
	});
};

startServer().catch((err) => {
	console.error('Server startup error:', err);
	process.exit(1);
});

export default app;
>>>>>>> f6ecbbf (feat: MongoDB implementation - players, champions, matches, tournament pipeline)
