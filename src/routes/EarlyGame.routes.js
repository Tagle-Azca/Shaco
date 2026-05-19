import express from 'express';
import EarlyGameController from '../controllers/EarlyGame.controller.js';
const router = express.Router();

// Obtener registros de early game por modo (ej: /api/early-game/CLASSIC)
router.get('/:gameMode', EarlyGameController.getStats);

// Analizar y poblar una partida específica
router.post('/sync', EarlyGameController.syncMatch);

export default router;