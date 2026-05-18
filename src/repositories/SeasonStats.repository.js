const client = require('../utils/cassandra');

class SeasonStatsRepository {
    async createOrUpdate(data) {
        const query = `
            INSERT INTO season_player_stats (
                player_id, season_id, total_games_played, total_kills,
                total_deaths, total_assists, highest_tier_achieved,
                most_played_champion_id, average_kda
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
        const params = [
            data.player_id,
            data.season_id,
            data.total_games_played,
            data.total_kills,
            data.total_deaths,
            data.total_assists,
            data.highest_tier_achieved,
            data.most_played_champion_id,
            data.average_kda
        ];
        return client.execute(query, params, { prepare: true });
    }

    async getByPlayerAndSeason(playerId, seasonId) {
        const query = `
            SELECT * FROM season_player_stats 
            WHERE player_id = ? AND season_id = ?
        `;
        const result = await client.execute(query, [playerId, seasonId], { prepare: true });
        return result.first();
    }

    async getAllSeasonsByPlayer(playerId) {
        const query = 'SELECT * FROM season_player_stats WHERE player_id = ?';
        const result = await client.execute(query, [playerId], { prepare: true });
        return result.rows;
    }
}

module.exports = new SeasonStatsRepository();