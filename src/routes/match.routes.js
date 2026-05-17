import { Router } from 'express';
import { getMatchesByPuuid, syncMatches, getMatchById } from '../controllers/match.controller.js';

const router = Router();

router.get('/detail/:matchId', getMatchById);
router.get('/:puuid', getMatchesByPuuid);
router.post('/sync/:puuid', syncMatches);


export default router;
