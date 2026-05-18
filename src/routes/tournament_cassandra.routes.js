const express = require('express');
const router = express.Router();
const TournamentController = require('../controllers/tournament_cassandra.controller');

// Obtener los partidos de un torneo específico
router.get('/:tournamentId/matches', TournamentController.getMatches);

// Registrar un nuevo resultado de torneo
router.post('/match', TournamentController.addMatch);

module.exports = router;