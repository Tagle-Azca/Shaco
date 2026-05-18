const client = require('../utils/cassandra');

class PlayerRankingRepository {
    async create(data) {
        const query = `
            INSERT INTO player_ranking_history (
                player_id, date, tier, rank, league_points, wins, losses, series_progress
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `;
        const params = [
            data.player_id,
            data.date || new Date(),
            data.tier,
            data.rank,
            data.league_points,
            data.wins,
            data.losses,
            data.series_progress
        ];
        return client.execute(query, params, { prepare: true });
    }

    async getHistoryByPlayer(playerId) {
        const query = 'SELECT * FROM player_ranking_history WHERE player_id = ?';
        const result = await client.execute(query, [playerId], { prepare: true });
        return result.rows;
    }
}

module.exports = new PlayerRankingRepository();