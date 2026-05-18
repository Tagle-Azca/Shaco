const MetaChangesRepository = require('../repositories/MetaChanges.repository');

class MetaChangesService {
    /**
     * Sincroniza los datos del meta. 
     * Nota: En un entorno real, esto vendría de un proceso de agregación de datos (Data Pipeline).
     */
    async syncMetaForPatch(patchVersion, statsArray) {
        try {
            const promises = statsArray.map(stat => {
                const data = {
                    patch_version: patchVersion,
                    champion_id: stat.championId,
                    global_win_rate: stat.winRate,
                    global_pick_rate: stat.pickRate,
                    global_ban_rate: stat.banRate,
                    total_games_analyzed: stat.totalGames
                };
                return MetaChangesRepository.updateOrInsert(data);
            });

            await Promise.all(promises);
            return { patch: patchVersion, championsUpdated: statsArray.length };
        } catch (error) {
            console.error("Error al sincronizar meta:", error);
            throw error;
        }
    }

    async getMetaByPatch(patchVersion) {
        return await MetaChangesRepository.getByPatch(patchVersion);
    }
}

module.exports = new MetaChangesService();