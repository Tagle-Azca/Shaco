import client from "../utils/cassandra.js";
class EarlyGameRepository {
    async create(data) {
        const query = `
            INSERT INTO early_game_stats (
                game_mode, match_timestamp, match_id, first_blood_team_id,
                first_blood_time, first_dragon_team_id, first_dragon_type,
                first_herald_team_id, win_loss_result
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
        const params = [
            data.game_mode,
            data.match_timestamp,
            data.match_id,
            data.first_blood_team_id,
            data.first_blood_time,
            data.first_dragon_team_id,
            data.first_dragon_type,
            data.first_herald_team_id,
            data.win_loss_result
        ];
        return client.execute(query, params, { prepare: true });
    }

    async getByGameMode(gameMode, limit = 50) {
        const query = `
            SELECT * FROM early_game_stats 
            WHERE game_mode = ? 
            LIMIT ?
        `;
        const result = await client.execute(query, [gameMode, limit], { prepare: true });
        return result.rows;
    }
}

export default new EarlyGameRepository();