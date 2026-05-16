import { Router } from 'express';
import * as q from '../services/graph.queries.js';

const router = Router();

router.get('/champion/:championId',   q.getChampionGraph);   // { synergies[], counters[] }
router.get('/player/:puuid/overview', q.getPlayerOverview);  // { mains[], network[] }
router.get('/pro/teams',              q.getActiveTeams);     // Team[] con rosters
router.get('/pro/player/:id',         q.getProProfile);      // { career[], rivalries[] }
router.get('/pro/org',                q.getOrgGraph);        // jerarquía Org → Team → ProPlayer
router.get('/full',                   q.getFullGraph);       // { nodes[], links[] } para grafo

export default router;
