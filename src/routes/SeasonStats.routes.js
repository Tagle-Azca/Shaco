const express = require('express');
const router = express.Router();
const SeasonStatsController = require('../controllers/SeasonStats.controller');

// Obtener todas las temporadas de un jugador
router.get('/:playerId/seasons', SeasonStatsController.getHistory);

// Endpoint para que los workers o la ingesta acumulen una partida a la temporada
router.post('/accumulate', SeasonStatsController.updateStats);

module.exports = router;