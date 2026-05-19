import express from 'express';
import ChampPopularityController from '../controllers/ChampPopularity.controller.js';

const router = express.Router();
// Obtener el top de campeones de la semana (ej: /api/popularity/20?limit=5)
router.get('/:weekNumber', ChampPopularityController.getMetaRanking);

// Endpoint de carga para los reportes semanales recalculados
router.post('/populate', ChampPopularityController.populateWeek);

export default router;