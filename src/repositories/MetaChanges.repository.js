import client from "../utils/cassandra.js";

class MetaChangesRepository {
    async updateOrInsert(data) {
        const query = `
            INSERT INTO meta_changes_by_patch (
                patch_version, champion_id, global_win_rate, 
                global_pick_rate, global_ban_rate, total_games_analyzed
            ) VALUES (?, ?, ?, ?, ?, ?)
        `;
        const params = [
            data.patch_version,
            data.champion_id,
            data.global_win_rate,
            data.global_pick_rate,
            data.global_ban_rate,
            data.total_games_analyzed
        ];
        return client.execute(query, params, { prepare: true });
    }

    async getByPatch(patchVersion) {
        const query = 'SELECT * FROM meta_changes_by_patch WHERE patch_version = ?';
        const result = await client.execute(query, [patchVersion], { prepare: true });
        return result.rows;
    }
}

export default new MetaChangesRepository();