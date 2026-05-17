import { Router } from 'express';
import graphRoutes        from './graph.routes.js';
import championRoutes     from './champion.routes.js';
import matchRoutes        from './match.routes.js';
import playerRoutes       from './player.routes.js';
import rankingRoutes      from './ranking.routes.js';
import tournamentRoutes   from './tournament.routes.js';
import userSettingsRoutes from './userSettings.routes.js';

const router = Router();

router.use('/graph',      graphRoutes);
router.use('/champion',   championRoutes);
router.use('/match',      matchRoutes);
router.use('/player',     playerRoutes);
router.use('/ranking',    rankingRoutes);
router.use('/tournament', tournamentRoutes);
router.use('/settings', userSettingsRoutes);

export default router;
