const express = require('express');
const router = express.Router();
const ChampPopularityController = require('../controllers/ChampPopularity.controller');

// Obtener el top de campeones de la semana (ej: /api/popularity/20?limit=5)
router.get('/:weekNumber', ChampPopularityController.getMetaRanking);

// Endpoint de carga para los reportes semanales recalculados
router.post('/populate', ChampPopularityController.populateWeek);

module.exports = router;