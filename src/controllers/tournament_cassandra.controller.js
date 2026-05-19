import TournamentService from "../services/tournament.service.js";
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

export default new TournamentController();