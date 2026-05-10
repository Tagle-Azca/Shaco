const { Router } = require('express');
const graphRoutes = require('./graph.routes');

// TODO Ethan (MongoDB)
const championRoutes = require('./champion.routes');
const matchRoutes    = require('./match.routes');
const playerRoutes   = require('./player.routes');

// TODO Rafael (Cassandra)
const rankingRoutes    = require('./ranking.routes');
const tournamentRoutes = require('./tournament.routes');

const router = Router();

router.use('/graph',      graphRoutes);
router.use('/champion',   championRoutes);
router.use('/match',      matchRoutes);
router.use('/player',     playerRoutes);
router.use('/ranking',    rankingRoutes);
router.use('/tournament', tournamentRoutes);

module.exports = router;
