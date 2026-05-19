import express from 'express';
import SeasonStatsController from '../controllers/SeasonStats.controller.js';
const router = express.Router();
// Obtener todas las temporadas de un jugador
router.get('/:playerId/seasons', SeasonStatsController.getHistory);

// Endpoint para que los workers o la ingesta acumulen una partida a la temporada
router.post('/accumulate', SeasonStatsController.updateStats);

export default router;