const express = require('express');
const router = express.Router();
const PlayerRankingController = require('../controllers/playerRanking.controller');

// Obtener el historial guardado
router.get('/:playerId/history', PlayerRankingController.getHistory);

// Disparar una sincronización (poblamiento)
router.post('/sync', PlayerRankingController.sync);

module.exports = router;