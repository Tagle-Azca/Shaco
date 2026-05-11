import { Router } from 'express';
import { syncAllChampions, listAllChampions, getChampionById, getChampionByRole } from '../controllers/champion.controller.js';

const router = Router();

router.post('/sync', syncAllChampions);
router.get('/', listAllChampions);
router.get('/role/:role', getChampionByRole);
router.get('/:championId', getChampionById);

export default router;