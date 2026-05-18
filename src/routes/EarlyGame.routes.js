const express = require('express');
const router = express.Router();
const EarlyGameController = require('../controllers/EarlyGame.controller');

// Obtener registros de early game por modo (ej: /api/early-game/CLASSIC)
router.get('/:gameMode', EarlyGameController.getStats);

// Analizar y poblar una partida específica
router.post('/sync', EarlyGameController.syncMatch);

module.exports = router;