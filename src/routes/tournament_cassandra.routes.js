import express from 'express';
import TournamentController from '../controllers/tournament_cassandra.controller.js';
const router = express.Router();
// Obtener los partidos de un torneo específico
router.get('/:tournamentId/matches', TournamentController.getMatches);

// Registrar un nuevo resultado de torneo
router.post('/match', TournamentController.addMatch);

export default router;