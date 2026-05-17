import { Router } from 'express';
import { getStoredPlayerProfile, getStoredPlayerProfileByRiotId, syncPlayerProfile, getPlayerStats } from '../controllers/player.controller.js';

const router = Router();

router.get('/profile', syncPlayerProfile);
router.get('/search', getStoredPlayerProfileByRiotId);
router.get('/:puuid/stats', getPlayerStats);
router.get('/:puuid', getStoredPlayerProfile);

export default router;
