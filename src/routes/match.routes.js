import { Router } from 'express';
import { getMatchesByPuuid, syncMatches } from '../controllers/match.controller.js';

const router = Router();

router.get('/:puuid', getMatchesByPuuid);
router.post('/sync/:puuid', syncMatches);

export default router;
