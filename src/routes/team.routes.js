import { Router } from 'express';
import { getAllTeams, getAllProPlayers, getTeamById } from '../controllers/team.controller.js';

const router = Router();

router.get('/', getAllTeams);
router.get('/:teamId', getTeamById);

export default router;