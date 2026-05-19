import express from 'express';
import PlayerRankingController from '../controllers/playerRanking.controller.js';
const router = express.Router();
// Obtener el historial guardado
router.get('/:playerId/history', PlayerRankingController.getHistory);

// Disparar una sincronización (poblamiento)
router.post('/sync', PlayerRankingController.sync);

export default router;