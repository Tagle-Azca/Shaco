import { Router } from 'express';
import { getWinratesByPatch, getPicksByPatch, getTournamentResults } from '../controllers/tournament.controller.js';

const router = Router();

router.get('/winrates/:patchId', getWinratesByPatch);
router.get('/picks/:patchId', getPicksByPatch);
router.get('/results/:tournamentId', getTournamentResults);

export default router;
