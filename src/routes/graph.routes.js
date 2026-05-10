const { Router } = require('express');
const ctrl = require('../controllers/graph.controller');

const router = Router();

// Champion graph
router.get('/champion/:championId/synergies', ctrl.getSynergies);
router.get('/champion/:championId/counters',  ctrl.getCounters);

// Player graph
router.get('/player/:puuid/mains',   ctrl.getPlayerMains);
router.get('/player/:puuid/network', ctrl.getPlayerNetwork);

// Pro scene graph
router.get('/pro/org',              ctrl.getOrgGraph);
router.get('/pro/player/:id/career', ctrl.getProCareer);
router.get('/pro/rivalry/:id',       ctrl.getProRivalry);

// Full graph (visualización)
router.get('/full', ctrl.getFullGraph);

module.exports = router;
