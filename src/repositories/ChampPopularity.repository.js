const client = require('../utils/cassandra');

class ChampPopularityRepository {
    async createOrUpdate(data) {
        const query = `
            INSERT INTO champion_popularity_weekly (
                week_number, pick_count, champion_id, tier_avg, win_rate_in_week
            ) VALUES (?, ?, ?, ?, ?)
        `;
        const params = [
            data.week_number,
            data.pick_count,
            data.champion_id,
            data.tier_avg,
            data.win_rate_in_week
        ];
        return client.execute(query, params, { prepare: true });
    }

    async getTopChampionsByWeek(weekNumber, limit = 10) {
        const query = `
            SELECT * FROM champion_popularity_weekly 
            WHERE week_number = ? 
            LIMIT ?
        `;
        const result = await client.execute(query, [weekNumber, limit], { prepare: true });
        return result.rows;
    }
}

module.exports = new ChampPopularityRepository();