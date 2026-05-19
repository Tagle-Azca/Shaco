import client from "../utils/cassandra.js";
class TournamentRepository {
    async create(data) {
        const query = `
            INSERT INTO international_tournaments (
                tournament_id, match_date, match_id, team_a_name, 
                team_b_name, team_a_score, team_b_score, winner_id, stage
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
        const params = [
            data.tournament_id,
            data.match_date,
            data.match_id,
            data.team_a_name,
            data.team_b_name,
            data.team_a_score,
            data.team_b_score,
            data.winner_id,
            data.stage
        ];
        return client.execute(query, params, { prepare: true });
    }

    async getMatchesByTournament(tournamentId) {
        const query = 'SELECT * FROM international_tournaments WHERE tournament_id = ?';
        const result = await client.execute(query, [tournamentId], { prepare: true });
        return result.rows;
    }
}

export default new TournamentRepository();