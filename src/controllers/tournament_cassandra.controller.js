const TournamentService = require('../services/Tournament_cassandra.service');

class TournamentController {
    async getMatches(req, res) {
        try {
            const { tournamentId } = req.params;
            const matches = await TournamentService.getTournamentBracket(tournamentId);
            res.json(matches);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async addMatch(req, res) {
        try {
            const result = await TournamentService.registerMatchResult(req.body);
            res.status(201).json({ message: "Partido de torneo registrado", data: result });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new TournamentController();