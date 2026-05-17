import { Router } from 'express';
import * as graphController from '../controllers/graph.controller.js';

const router = Router();

router.get('/champion/:championId',   graphController.getChampionGraph);
router.get('/player/:puuid/overview', graphController.getPlayerOverview);
router.get('/pro/teams',              graphController.getActiveTeams);
router.get('/pro/player/:id',         graphController.getProProfile);
router.get('/pro/org',                graphController.getOrgGraph);
router.get('/full',                   graphController.getFullGraph);

export default router;
