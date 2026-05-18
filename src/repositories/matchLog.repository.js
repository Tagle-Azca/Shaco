const client = require('../utils/cassandra');

class MatchLogRepository {
    async create(data) {
        const query = `
            INSERT INTO player_match_log (
                player_id, match_timestamp, match_id, game_mode, 
                champion_id, participants, win, duration
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `;
        const params = [
            data.player_id,
            data.match_timestamp,
            data.match_id,
            data.game_mode,
            data.champion_id,
            data.participants,
            data.win,
            data.duration
        ];
        // prepare: true es vital para que el driver mapee el Array de JS al list de CQL
        return client.execute(query, params, { prepare: true });
    }

    async getLatestByPlayer(playerId, limit = 1) {
        const query = `
            SELECT * FROM player_match_log 
            WHERE player_id = ? 
            LIMIT ?
        `;
        const result = await client.execute(query, [playerId, limit], { prepare: true });
        return limit === 1 ? result.first() : result.rows;
    }
}

module.exports = new MatchLogRepository();