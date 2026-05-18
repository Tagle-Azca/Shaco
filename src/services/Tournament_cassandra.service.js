const TournamentRepository = require('../repositories/Tournament_cassandra.repository');

class TournamentService {
    /**
     * Ingesta o registra el resultado de un partido de torneo profesional
     */
    async registerMatchResult(matchData) {
        try {
            const formattedData = {
                tournament_id: matchData.tournamentId,
                match_date: new Date(matchData.matchDate),
                match_id: matchData.matchId,
                team_a_name: matchData.teamAName,
                team_b_name: matchData.teamBName,
                team_a_score: matchData.teamAScore,
                team_b_score: matchData.teamBScore,
                winner_id: matchData.winnerId,
                stage: matchData.stage
            };

            await TournamentRepository.create(formattedData);
            return formattedData;
        } catch (error) {
            console.error("Error al registrar resultado del torneo:", error);
            throw error;
        }
    }

    async getTournamentBracket(tournamentId) {
        return await TournamentRepository.getMatchesByTournament(tournamentId);
    }
}

module.exports = new TournamentService();