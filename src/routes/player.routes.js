import { Router } from 'express';
import { getStoredPlayerProfile, syncPlayerProfile } from '../controllers/player.controller.js';

const router = Router();

router.get('/profile', syncPlayerProfile);
router.get('/:puuid', getStoredPlayerProfile);

export default router;

